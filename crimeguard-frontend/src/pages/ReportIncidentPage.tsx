import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import type { LeafletMouseEvent } from 'leaflet';
import { Upload, MapPin, Users, Phone, Clock, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface IncidentFormData {
  title: string;
  category: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  nearbyStation: string;
  victims: string;
  witnesses: string;
  suspects: string;
  contactNumber: string;
  datetime: string;
  anonymous: boolean;
  mediaFiles?: FileList;
}

const ReportIncidentPage: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [reportId, setReportId] = useState<string>('');
  const [mapLocation, setMapLocation] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai default

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IncidentFormData>({
    defaultValues: {
      anonymous: false,
      latitude: mapLocation.lat,
      longitude: mapLocation.lng,
    },
  });

  const watchAnonymous = watch('anonymous');

  const categories = [
    'Theft',
    'Robbery',
    'Assault',
    'Vandalism',
    'Fraud',
    'Burglary',
    'Cybercrime',
    'Harassment',
    'Minor',
    'Other',
  ];

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
        setMapLocation(newLocation);
        setValue('latitude', newLocation.lat);
        setValue('longitude', newLocation.lng);
      },
    });

    return <Marker position={[mapLocation.lat, mapLocation.lng]} />;
  };

  const onSubmit = async (data: IncidentFormData) => {
    setSubmitStatus('loading');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock report ID
      const mockReportId = `CG-${Date.now().toString().slice(-6)}`;
      setReportId(mockReportId);
      setSubmitStatus('success');
      console.log('Report submitted:', data);
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Report Submitted!</h2>
            <p className="text-gray-300 mb-6">
              Your incident report has been received and is being reviewed.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
              <p className="text-sm text-gray-400 mb-2">Reference Number</p>
              <span className="text-2xl font-mono font-bold text-green-400">{reportId}</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">
              Please save this reference number for tracking your report.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setReportId('');
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              >
                Submit Another Report
              </button>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all duration-300">
                View My Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Report a Crime</h1>
              <p className="text-gray-400 text-sm">Help keep your community safe</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Crime Title */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Crime Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Enter the crime title"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Crime Description */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Crime Description *
                  </label>
                  <textarea
                    {...register('description', {
                      required: 'Description is required',
                      minLength: { value: 20, message: 'Description must be at least 20 characters' },
                    })}
                    rows={6}
                    placeholder="Describe the crime in detail"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300 resize-none"
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location Map */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-400" />
                    Location of Crime scene *
                  </label>
                  <div className="h-64 rounded-xl overflow-hidden border border-white/10 mb-3">
                    <MapContainer
                      center={[mapLocation.lat, mapLocation.lng]}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker />
                    </MapContainer>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      {...register('location', { required: 'Location is required' })}
                      placeholder="Enter the location of the crime"
                      className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Crime Category */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Crime Category *
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-900">Choose</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Media Proof */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Media Proof
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer bg-black/20">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Choose file(s) or drag and drop</p>
                    <p className="text-sm text-gray-500 mb-4">Video and images</p>
                    <input
                      type="file"
                      {...register('mediaFiles')}
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      id="media-upload"
                    />
                    <label
                      htmlFor="media-upload"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer"
                    >
                      Choose File(s)
                    </label>
                  </div>
                </div>
              </div>

              {/* Nearby Stations */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Nearby Stations
                  </label>
                  <select
                    {...register('nearbyStation')}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-900">Choose</option>
                    <option value="station1" className="bg-gray-900">Mumbai Central Police Station</option>
                    <option value="station2" className="bg-gray-900">Andheri Police Station</option>
                    <option value="station3" className="bg-gray-900">Bandra Police Station</option>
                  </select>
                </div>
              </div>

              {/* Names Grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Name of victims */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Name of victims
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('victims')}
                        placeholder="Enter the names (comma-separated)"
                        className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                      />
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Name of Witnesses */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Name of Witnesses
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('witnesses')}
                        placeholder="Enter the names (comma-separated)"
                        className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                      />
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Name of suspects */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Name of suspects
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('suspects')}
                        placeholder="Enter the names (comma-separated)"
                        className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                      />
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Number & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Number */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Contact Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        {...register('contactNumber')}
                        placeholder="+91 ..."
                        className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Time of occurring */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Time of occurring
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        {...register('datetime', { required: 'Date and time is required' })}
                        className="w-full px-4 py-3 pl-10 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-black/40 transition-all duration-300"
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.datetime && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.datetime.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit anonymously */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Submit anonymously
                  </label>
                  <label className="flex items-center cursor-pointer group/toggle">
                    <input
                      type="checkbox"
                      {...register('anonymous')}
                      className="sr-only peer"
                    />
                    <div className="relative w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-600 peer-checked:to-red-700"></div>
                    <span className="ml-3 text-sm text-gray-400">
                      {watchAnonymous ? 'Anonymous submission enabled' : 'Submit with your identity'}
                    </span>
                  </label>
                  <p className="mt-3 text-xs text-gray-500">
                    Submit the crime report without revealing your identity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative">
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Report...
                  </span>
                ) : (
                  'Submit Crime Report'
                )}
              </button>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <p className="text-red-400">
                  There was an error submitting your report. Please try again.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportIncidentPage;
