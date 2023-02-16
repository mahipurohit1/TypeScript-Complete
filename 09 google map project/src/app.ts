import axios from "axios";
import L from "leaflet";

const form = document.querySelector("form") as HTMLFormElement;
const addressInput = document.getElementById("address") as HTMLInputElement;

const API_URL = "https://nominatim.openstreetmap.org";
let map: L.Map | undefined;

interface Location {
  lat: string;
  lon: string;
}

async function searchAddressHandler(event: SubmitEvent) {
  event.preventDefault();

  const address = addressInput.value;
  console.log(address);

  try {
    const res = await axios.get<Location[]>(
      `${API_URL}/search?q="${encodeURI(address)}"&format=json`
    );

    if (res.data.length === 0) throw new Error("Could not fetch location!");

    const coordinates: [number, number] = [+res.data[0].lat, +res.data[0].lon];
    console.log(coordinates);

    if (map) map.remove();

    map = L.map("map").setView(coordinates, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coordinates).addTo(map).bindPopup(address).openPopup();
  } catch (err) {
    console.error(err);
  }
}

form.addEventListener("submit", searchAddressHandler);
