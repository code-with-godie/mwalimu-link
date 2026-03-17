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
import {
  School,
  MapPin,
  Globe,
  Building2,
  ChevronDown,
  Plus,
} from "lucide-react";

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

  // Update states when country changes
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

  // Update cities when state changes
  useEffect(() => {
    if (watchState && selectedCountry) {
      const stateCities = City.getCitiesOfState(selectedCountry, watchState);
      setCities(stateCities);
      setValue("city", "");
    }
  }, [watchState, selectedCountry, setValue]);

  // Check if city is "other"
  useEffect(() => {
    setShowCustomCity(watchCity === "other");
  }, [watchCity]);

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
          <Label htmlFor="institutionName">Institution Name</Label>
          <div className="relative mt-1">
            <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="institutionName"
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
          <Label htmlFor="institutionType">Institution Type</Label>
          <Select
            onValueChange={(value) => setValue("institutionType", value as any)}
            defaultValue={watch("institutionType")}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select institution type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary School</SelectItem>
              <SelectItem value="secondary">Secondary School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.institutionType && (
            <p className="text-xs text-destructive mt-1">
              {errors.institutionType.message}
            </p>
          )}
        </div>

        {/* Country Selection */}
        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            onValueChange={(value) => setValue("country", value)}
            defaultValue={watchCountry || "KE"}
          >
            <SelectTrigger className="w-full mt-1">
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
          {errors.country && (
            <p className="text-xs text-destructive mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* State/County Selection */}
        {states.length > 0 && (
          <div>
            <Label htmlFor="state">County / State</Label>
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
            {errors.state && (
              <p className="text-xs text-destructive mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        )}

        {/* City Selection */}
        {cities.length > 0 && (
          <div>
            <Label htmlFor="city">City</Label>
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
                <SelectItem
                  value="other"
                  className="text-primary border-t mt-1 pt-1"
                >
                  <Plus className="h-3 w-3 inline mr-1" />
                  Other (type manually)
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-xs text-destructive mt-1">
                {errors.city.message}
              </p>
            )}
          </div>
        )}

        {/* Custom City Input */}
        {showCustomCity && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Label htmlFor="customCity">Enter your city</Label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customCity"
                {...register("customCity")}
                placeholder="Enter your city name"
                className="pl-9"
              />
            </div>
            {errors.customCity && (
              <p className="text-xs text-destructive mt-1">
                {errors.customCity.message}
              </p>
            )}
          </motion.div>
        )}

        {/* Registration Number (optional) */}
        <div>
          <Label htmlFor="registrationNumber">
            Registration Number (optional)
          </Label>
          <div className="relative mt-1">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="registrationNumber"
              {...register("registrationNumber")}
              placeholder="REG/2024/001"
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
