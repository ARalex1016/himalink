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

const REACT_API_GOOGLE_MAPS_API_KEY = "AIzaSyA75ltw3MeMHuhJjoTU_r_tXN-Fnp2wTfY";

const MapWrapper = ({ children, className }: MapWrapperProps) => {
  return <div className={`w-full h-72 ${className}`}>{children}</div>;
};

export const DisplayMap = ({ markers }: DisplayMapProps) => {
  const [selectedMarker, setSelectedMarker] = React.useState<Marker | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_API_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = React.useCallback((map: any) => map.setZoom(12), []);

  return isLoaded ? (
    <MapWrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markers[0] || { lat: 0, lng: 0 }}
        onLoad={onLoad}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map((marker) => (
          <MarkerF
            key={marker.name}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
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
            key={selectedMarker?.name}
            position={{
              lat: selectedMarker?.lat,
              lng: selectedMarker?.lng,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="text-sm">
              {selectedMarker?.name || "Selected Location"}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </MapWrapper>
  ) : (
    <></>
  );
};

const libraries: "places"[] = ["places"];

export const LocationPickerMap = ({
  onLocationSelect,
}: LocationPickerProps) => {
  const { country } = useAuthStore();

  const defaultLocation = { lat: 27.7172, lng: 85.324 };

  const [selectedPosition, setSelectedPosition] =
    React.useState<Marker>(defaultLocation);

  const [address, setAddress] = React.useState("");

  const [name, setName] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_API_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || "";
        const name = place.name || "";
        setSelectedPosition({ lat, lng });
        setAddress(address);
        setName(name);
        onLocationSelect({ lat, lng, address, name });
      }
    }
  };

  React.useEffect(() => {
    if (country?.lat && country?.lng) {
      setSelectedPosition({
        lat: country.lat,
        lng: country.lng,
      });
    }
  }, [country]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full flex flex-col gap-y-2">
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

      <Autocomplete
        onLoad={(auto) => (autocompleteRef.current = auto)}
        onPlaceChanged={onPlaceChanged}
      >
        <div className="flex flex-row border rounded-md overflow-hidden">
          <input
            ref={inputRef}
            id="place-autocomplete"
            type="text"
            placeholder="Search location..."
            className="p-2 w-full rounded-l-inherit"
          />

          <img
            src={CloseIcon}
            alt="X Icon"
            title="Clear"
            onClick={() => {
              setAddress("");
              setName("");
              setSelectedPosition(defaultLocation);
              onLocationSelect(defaultLocation);

              if (inputRef.current) {
                inputRef.current.value = ""; // <-- clear the field
              }
            }}
            className="bg-red-500/75 p-2 hover:bg-red-500 cursor-pointer"
          />
        </div>
      </Autocomplete>

      {/* <div className="text-sm text-gray-700">
        <b>Selected Address:</b> {address || "None selected"}
      </div> */}
    </div>
  );
};
