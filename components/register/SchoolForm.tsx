"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { School, MapPin, Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Country, State, City } from "country-state-city";

// 👉 Define type locally (since no external props now)
type SchoolFormData = {
  institutionName: string;
  institutionType: string;
  country: string;
  state: string;
  city: string;
  customCity?: string;
  latitude?: string;
  longitude?: string;
};

const countries = Country.getAllCountries();

export function SchoolForm() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolFormData>();

  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [showCustomCity, setShowCustomCity] = useState(false);

  const watchCountry = watch("country");
  const watchState = watch("state");
  const watchCity = watch("city");

  // Default country
  useEffect(() => {
    setValue("country", "KE");
  }, [setValue]);

  // Load states
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

  // Load cities
  useEffect(() => {
    if (watchState && selectedCountry) {
      const stateCities = City.getCitiesOfState(selectedCountry, watchState);
      setCities(stateCities);
      setValue("city", "");
    }
  }, [watchState, selectedCountry, setValue]);

  // Custom city toggle
  useEffect(() => {
    setShowCustomCity(watchCity === "other");
  }, [watchCity]);

  // Coordinates logic
  useEffect(() => {
    if (!watchState || !selectedCountry) return;

    const selectedStateObj = states.find((s) => s.isoCode === watchState);

    if (watchCity && watchCity !== "other") {
      const selectedCityObj = cities.find((c) => c.name === watchCity);

      if (selectedCityObj) {
        setValue("latitude", selectedCityObj.latitude);
        setValue("longitude", selectedCityObj.longitude);
        return;
      }
    }

    if (selectedStateObj) {
      setValue("latitude", selectedStateObj.latitude);
      setValue("longitude", selectedStateObj.longitude);
    }
  }, [watchCity, watchState, cities, states, selectedCountry, setValue]);

  const onSubmit = (data: SchoolFormData) => {
    console.log("School Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="space-y-4 pt-4 border-t"
      >
        <h3 className="font-semibold text-sm">Institution Details</h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Institution Name */}
          <div>
            <Label>Institution Name</Label>
            <div className="relative mt-1">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                {...register("institutionName", {
                  required: "Institution name is required",
                })}
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
            <Label>Institution Type</Label>
            <Select
              onValueChange={(value) => setValue("institutionType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="JSS">Junior Secondary</SelectItem>
                <SelectItem value="SSS">Senior Secondary</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div>
            <Label>Country</Label>
            <Select
              onValueChange={(value) => setValue("country", value)}
              defaultValue="KE"
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State */}
          {states.length > 0 && (
            <div>
              <Label>County / State</Label>
              <Select onValueChange={(value) => setValue("state", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* City */}
          {cities.length > 0 && (
            <div>
              <Label>City</Label>
              <Select onValueChange={(value) => setValue("city", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">
                    <Plus className="inline h-3 w-3 mr-1" />
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Custom City */}
          {showCustomCity && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Label>Enter your city</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                <Input
                  {...register("customCity")}
                  placeholder="Enter your city"
                  className="pl-9"
                />
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-md"
          >
            Register School
          </button>
        </div>
      </motion.div>
    </form>
  );
}
