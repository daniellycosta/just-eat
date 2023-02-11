import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Map from "../Map/Index"
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface HeaderMapsProps {
  latitude: number,
  longitude: number,
  displayMarker:boolean
}

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const HeaderMap = ({ latitude, longitude, displayMarker}: HeaderMapsProps) => {

  return (
    <MapContainer
      style={{ height: "150px", width: "100%", opacity:0.5 }}
      center={[latitude ?? 0, longitude ?? 0]}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
    >
      <Map latitude={latitude ?? 0} longitude={longitude ?? 0}/>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {displayMarker && <Marker position={[latitude, longitude]}></Marker>}
    </MapContainer>
  )
}

export default HeaderMap