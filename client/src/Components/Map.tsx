import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Autocomplete,
} from "@react-google-maps/api";

// Icons
import MarkerRegularBlueIcon from "./../assets/icons/marker-icons/marker-regular-blue.svg";
import CloseIcon from "./../assets/icons/close.svg";

// Type
import type { Location as Marker } from "../type";

// Store
import useAuthStore from "../Store/useAuthStore";

interface DisplayMapProps {
  markers: Marker[];
}

interface LocationPickerProps {
  onLocationSelect: (location: Marker) => void;
}

interface MapWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapWrapper = ({ children, className }: MapWrapperProps) => {
  return <div className={`w-full h-72 ${className}`}>{children}</div>;
};

const libraries: "places"[] = ["places"];

export const GoogleMapsProvider = ({
  children,
}: {
  children: (isLoaded: boolean) => React.ReactNode;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <>
      {!isLoaded && (
        <div className="flex items-center justify-center w-full h-full text-sm text-gray-500 bg-gray-100 rounded">
          Loading map...
        </div>
      )}
      {isLoaded && children(isLoaded)}
    </>
  );
};

export const DisplayMap = ({ markers }: DisplayMapProps) => {
  const [selectedMarker, setSelectedMarker] = React.useState<Marker | null>(
    null
  );

  return (
    <MapWrapper>
      <GoogleMapsProvider>
        {(isLoaded) =>
          isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={markers[0] || { lat: 0, lng: 0 }}
              zoom={12}
            >
              {markers.map((marker, index) => (
                <MarkerF
                  key={`${marker.name}${index}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                    url: MarkerRegularBlueIcon,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 40),
                  }}
                  onClick={() => setSelectedMarker(marker)}
                />
              ))}

              {selectedMarker && (
                <InfoWindowF
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="text-sm">
                    {selectedMarker?.name || "Selected Location"}
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          )
        }
      </GoogleMapsProvider>
    </MapWrapper>
  );
};

export const LocationPickerMap = ({
  onLocationSelect,
}: LocationPickerProps) => {
  const { country } = useAuthStore();
  const defaultLocation = { lat: 27.7172, lng: 85.324 };
  const [selectedPosition, setSelectedPosition] =
    React.useState<Marker>(defaultLocation);
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <GoogleMapsProvider>
        {(isLoaded) =>
          isLoaded && (
            <>
              {/* Map */}
              <MapWrapper>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedPosition}
                  zoom={14}
                >
                  <MarkerF
                    position={selectedPosition}
                    icon={{
                      url: MarkerRegularBlueIcon,
                      scaledSize: new google.maps.Size(40, 40),
                      anchor: new google.maps.Point(20, 40),
                    }}
                  />
                </GoogleMap>
              </MapWrapper>

              {/* Autocomplete input */}
              <Autocomplete
                onLoad={(auto) => (autocompleteRef.current = auto)}
                onPlaceChanged={() => {
                  if (autocompleteRef.current) {
                    const place = autocompleteRef.current.getPlace();
                    if (place.geometry?.location) {
                      const lat = place.geometry.location.lat();
                      const lng = place.geometry.location.lng();
                      const address = place.formatted_address || "";
                      const name = place.name || "";
                      const newPos = { lat, lng, address, name };
                      setSelectedPosition(newPos);
                      onLocationSelect(newPos);
                    }
                  }
                }}
              >
                <div className="flex flex-row border rounded-md overflow-hidden">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search location..."
                    className="p-2 w-full rounded-l-inherit"
                  />
                  <img
                    src={CloseIcon}
                    alt="X Icon"
                    title="Clear"
                    onClick={() => {
                      setSelectedPosition(defaultLocation);
                      onLocationSelect(defaultLocation);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                    className="bg-red-500/75 p-2 hover:bg-red-500 cursor-pointer"
                  />
                </div>
              </Autocomplete>
            </>
          )
        }
      </GoogleMapsProvider>
    </div>
  );
};
