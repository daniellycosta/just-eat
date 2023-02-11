import { useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number,
  longitude: number,
}

export const Map = ({ latitude, longitude}: MapProps)=> {
  const map = useMap();
  map.setView([latitude, longitude]);
  return null;
}

export default Map