import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const CrimeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in production, fetch based on ID
  const crimeDetails = {
    id: id || '1',
    title: 'Asasdda',
    category: 'Theft',
    status: 'unverified',
    description: 'asdadasda',
    location: 'Kolkata, West Bengal, India',
    date: 'Wed, 13 Aug, 10:17 pm',
    contact: '34343434434',
    witnesses: ['asdad'],
    suspects: ['sdsasda'],
    victims: ['asda'],
    nearestPoliceStation: 'Shyampukur Police Station',
    reportedBy: 'Anonymous',
    reportId: '689cc203096d2277ab333950',
    views: 6,
    images: [
      { id: 1, bgColor: 'from-blue-500 to-purple-500' },
      { id: 2, bgColor: 'from-teal-500 to-cyan-500' },
      { id: 3, bgColor: 'from-pink-500 to-red-500' },
    ],
    currentImageIndex: 0,
    coordinates: { lat: 22.5726, lng: 88.3639 }, // Kolkata coordinates
  };

  const handlePrevImage = () => {
    // Image navigation logic
  };

  const handleNextImage = () => {
    // Image navigation logic
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard/crimes')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Crimes
        </button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Crime Report Details</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
              <div
                className={`h-80 bg-gradient-to-br ${crimeDetails.images[crimeDetails.currentImageIndex].bgColor} flex items-center justify-center relative`}
              >
                <div className="text-6xl font-bold text-white">
                  {crimeDetails.title.charAt(0).toUpperCase()}
                </div>
                {/* Badge */}
                <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  S01
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex items-center justify-center space-x-2">
              {crimeDetails.images.map((img, index) => (
                <div
                  key={img.id}
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${img.bgColor} cursor-pointer ${
                    index === crimeDetails.currentImageIndex
                      ? 'ring-2 ring-red-600'
                      : 'opacity-50'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">
                    {crimeDetails.title.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Category Badge & Title */}
            <div>
              <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-3">
                {crimeDetails.category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">{crimeDetails.title}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    crimeDetails.status === 'verified'
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {crimeDetails.status}
                </span>
              </div>
              <p className="text-gray-400 mt-2">{crimeDetails.description}</p>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{crimeDetails.location}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h3 className="text-white font-semibold mb-2">Date & Time</h3>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                <span>{crimeDetails.date}</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-2">Contact</h3>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                <span>{crimeDetails.contact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Witnesses */}
            <div>
              <h3 className="text-white font-semibold mb-2">Witnesses</h3>
              <ul className="list-disc list-inside text-gray-400">
                {crimeDetails.witnesses.map((witness, index) => (
                  <li key={index}>{witness}</li>
                ))}
              </ul>
            </div>

            {/* Suspects */}
            <div>
              <h3 className="text-white font-semibold mb-2">Suspects</h3>
              <ul className="list-disc list-inside text-gray-400">
                {crimeDetails.suspects.map((suspect, index) => (
                  <li key={index}>{suspect}</li>
                ))}
              </ul>
            </div>

            {/* Victims */}
            <div>
              <h3 className="text-white font-semibold mb-2">Victims</h3>
              <ul className="list-disc list-inside text-gray-400">
                {crimeDetails.victims.map((victim, index) => (
                  <li key={index}>{victim}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nearest Police Station */}
            <div>
              <h3 className="text-white font-semibold mb-2">Nearest Police Station</h3>
              <p className="text-gray-400">{crimeDetails.nearestPoliceStation}</p>
            </div>

            {/* Reported By */}
            <div>
              <h3 className="text-white font-semibold mb-2">Reported By</h3>
              <p className="text-gray-400">{crimeDetails.reportedBy}</p>
            </div>

            {/* Report ID */}
            <div>
              <h3 className="text-white font-semibold mb-2">Report ID</h3>
              <p className="text-gray-400 text-sm break-all">{crimeDetails.reportId}</p>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Location Map</h2>
            <div className="flex items-center text-gray-400 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Views: {crimeDetails.views}</span>
            </div>
          </div>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={[crimeDetails.coordinates.lat, crimeDetails.coordinates.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[crimeDetails.coordinates.lat, crimeDetails.coordinates.lng]} />
            </MapContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CrimeDetailsPage;
