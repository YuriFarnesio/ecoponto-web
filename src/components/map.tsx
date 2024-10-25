import { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'

interface LocationMarkerProps {
  selectedPosition: [number, number]
  setSelectedPosition: (value: [number, number]) => void
  isEditing: boolean
  initialPositions?: [number, number]
}

function LocationMarker({
  selectedPosition,
  setSelectedPosition,
  isEditing,
  initialPositions,
}: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      setSelectedPosition([e.latlng.lat, e.latlng.lng])
      map.flyTo(e.latlng, 15)
    },
  })

  useEffect(() => {
    if (isEditing) {
      if (
        initialPositions &&
        JSON.stringify(selectedPosition) === JSON.stringify(initialPositions)
      ) {
        map.flyTo(initialPositions)
      }

      return
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      setSelectedPosition([latitude, longitude])
      map.flyTo([latitude, longitude])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPositions])

  return (
    <Marker position={selectedPosition}>
      <Popup>
        {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
      </Popup>
    </Marker>
  )
}

interface MapProps {
  positions: [number, number]
  onChangePositions: (value: [number, number]) => void
  isEditing?: boolean
  initialPositions?: [number, number]
}

export function Map({
  positions,
  onChangePositions,
  isEditing = false,
  initialPositions,
}: MapProps) {
  return (
    <MapContainer
      zoom={15}
      center={positions}
      scrollWheelZoom={true}
      className="w-full h-44 md:h-96 rounded-lg z-30"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        selectedPosition={positions}
        setSelectedPosition={onChangePositions}
        isEditing={isEditing}
        initialPositions={initialPositions}
      />
    </MapContainer>
  )
}
