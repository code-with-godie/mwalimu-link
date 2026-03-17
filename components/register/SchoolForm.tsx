"use client";

import { useState, useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { School, MapPin, Building2, Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Country, State, City } from "country-state-city";
import { SchoolFormData } from "@/schema/auth";

// Get all countries
const countries = Country.getAllCountries();

interface SchoolFormProps {
  register: UseFormRegister<SchoolFormData>;
  errors: FieldErrors<SchoolFormData>;
  watch: UseFormWatch<SchoolFormData>;
  setValue: UseFormSetValue<SchoolFormData>;
}

export function SchoolForm({
  register,
  errors,
  watch,
  setValue,
}: SchoolFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("KE");
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [showCustomCity, setShowCustomCity] = useState(false);

  const watchCountry = watch("country");
  const watchState = watch("state");
  const watchCity = watch("city");

  // ✅ Set default country to Kenya
  useEffect(() => {
    setValue("country", "KE");
  }, [setValue]);

  // ✅ Load states when country changes
  useEffect(() => {
    if (watchCountry) {
      const countryStates = State.getStatesOfCountry(watchCountry);
      setStates(countryStates);
      setSelectedCountry(watchCountry);

      setCities([]);
      setValue("state", "");
      setValue("city", "");
    }
  }, [watchCountry, setValue]);

  // ✅ Load cities when state changes
  useEffect(() => {
    if (watchState && selectedCountry) {
      const stateCities = City.getCitiesOfState(selectedCountry, watchState);
      setCities(stateCities);
      setValue("city", "");
    }
  }, [watchState, selectedCountry, setValue]);

  // ✅ Show custom city input
  useEffect(() => {
    setShowCustomCity(watchCity === "other");
  }, [watchCity]);

  // ✅ Coordinates logic (MAIN FEATURE)
  useEffect(() => {
    if (!watchState || !selectedCountry) return;

    const selectedStateObj = states.find((s) => s.isoCode === watchState);

    // If user selected a real city
    if (watchCity && watchCity !== "other") {
      const selectedCityObj = cities.find((c) => c.name === watchCity);

      if (selectedCityObj) {
        setValue("latitude", selectedCityObj.latitude);
        setValue("longitude", selectedCityObj.longitude);
        return;
      }
    }

    // Fallback to state coordinates
    if (selectedStateObj) {
      setValue("latitude", selectedStateObj.latitude);
      setValue("longitude", selectedStateObj.longitude);
    }
  }, [watchCity, watchState, cities, states, selectedCountry, setValue]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 pt-4 border-t"
    >
      <h3 className="font-semibold text-sm">Institution Details</h3>

      <div className="grid grid-cols-1 gap-4">
        {/* Institution Name */}
        <div>
          <Label className="block w-full text-left">Institution Name</Label>
          <div className="relative mt-1">
            <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              {...register("institutionName")}
              placeholder="School or institution name"
              className="pl-9"
            />
          </div>
          {errors.institutionName && (
            <p className="text-xs text-destructive mt-1">
              {errors.institutionName.message}
            </p>
          )}
        </div>

        {/* Institution Type */}
        <div>
          <Label className="block w-full text-left">Institution Type</Label>
          <Select
            onValueChange={(value) => setValue("institutionType", value as any)}
            defaultValue={watch("institutionType")}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Country */}
        <div>
          <Label className="block w-full text-left">Country</Label>
          <Select
            onValueChange={(value) => setValue("country", value)}
            defaultValue="KE"
          >
            <SelectTrigger className="w-full  mt-1">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State */}
        {states.length > 0 && (
          <div>
            <Label className="block w-full text-left">County / State</Label>
            <Select
              onValueChange={(value) => setValue("state", value)}
              defaultValue={watchState}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select county" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* City */}
        {cities.length > 0 && (
          <div>
            <Label className="block w-full text-left">City</Label>
            <Select
              onValueChange={(value) => setValue("city", value)}
              defaultValue={watchCity}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}

                <SelectItem value="other">
                  <Plus className="h-3 w-3 inline mr-1" />
                  Other (type manually)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Custom City */}
        {showCustomCity && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Label className="block w-full text-left">Enter your city</Label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                {...register("customCity")}
                placeholder="Enter your city"
                className="w-full pl-9"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
