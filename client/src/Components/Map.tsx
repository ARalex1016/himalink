import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Autocomplete,
} from "@react-google-maps/api";
import { useFormContext } from "react-hook-form";
import type { UseFormSetValue, FieldPath } from "react-hook-form";

// Icons
import MarkerRegularBlueIcon from "./../assets/icons/marker-icons/marker-regular-blue.svg";
import CloseIcon from "./../assets/icons/close.svg";

// Type
import type { Location as Marker } from "../type";
import type { LocationInfoStepSchema } from "../Pages/CreateEvent/LocationStep";

interface DisplayMapProps {
  markers: Marker[];
}

interface LocationPickerProps {
  setValue: UseFormSetValue<LocationInfoStepSchema>;
  fieldName: FieldPath<LocationInfoStepSchema>;
  children?: React.ReactNode;
}

interface MapWrapperProps {
  children: React.ReactNode;
  className?: string;
}

interface MarkerPosition extends google.maps.LatLngLiteral {
  address?: string;
  name?: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapWrapper = ({ children, className }: MapWrapperProps) => {
  return <div className={`w-full h-72 ${className}`}>{children}</div>;
};

const libraries: "places"[] = ["places"];

// Type guard
const isLocationObject = (
  value: unknown
): value is { lat: number; lng: number; name: string; address: string } => {
  return (
    typeof value === "object" &&
    value !== null &&
    "lat" in value &&
    "lng" in value &&
    "name" in value &&
    "address" in value
  );
};

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
  setValue,
  fieldName,
  children,
}: LocationPickerProps) => {
  const { watch } = useFormContext<LocationInfoStepSchema>();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );

  // Watch form value
  const locationValue = watch(fieldName);

  const defaultCenter = { lat: 28.3949, lng: 84.124 }; // 🇳🇵 Nepal center

  // Update form when selecting a place
  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const name = place.name || "";
    const address = place.formatted_address || "";

    setValue(fieldName, { lat, lng, name, address });
  };

  // Clear location
  const handleClear = () => {
    setValue(fieldName, {
      lat: defaultCenter.lat,
      lng: defaultCenter.lng,
      name: "",
      address: "",
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <GoogleMapsProvider>
        {(isLoaded) =>
          isLoaded && (
            <>
              <Autocomplete
                onLoad={(auto) => (autocompleteRef.current = auto)}
                onPlaceChanged={handlePlaceChanged}
              >
                <div className="flex flex-row bg-transparent border border-white/25 rounded-md text-white/75 focus:border-white overflow-hidden">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search location..."
                    defaultValue={
                      isLocationObject(locationValue)
                        ? `${locationValue.name}, ${locationValue.address}`
                        : ""
                    }
                    className="text-white px-4 w-full rounded-l-inherit"
                  />

                  <img
                    src={CloseIcon}
                    alt="X Icon"
                    title="Clear"
                    onClick={handleClear}
                    className="bg-red-500/75 p-2 hover:bg-red-500 cursor-pointer"
                  />
                </div>
              </Autocomplete>

              {children}

              <MapWrapper>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={
                    isLocationObject(locationValue)
                      ? { lat: locationValue.lat, lng: locationValue.lng }
                      : defaultCenter
                  }
                  zoom={isLocationObject(locationValue) ? 14 : 4}
                >
                  {isLocationObject(locationValue) && (
                    <MarkerF
                      position={{
                        lat: locationValue.lat,
                        lng: locationValue.lng,
                      }}
                      icon={{
                        url: MarkerRegularBlueIcon,
                        scaledSize: new google.maps.Size(40, 40),
                        anchor: new google.maps.Point(20, 40),
                      }}
                    />
                  )}
                </GoogleMap>
              </MapWrapper>
            </>
          )
        }
      </GoogleMapsProvider>
    </div>
  );
};
