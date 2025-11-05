import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, AlertBanner } from '../components/ui';

interface IncidentFormData {
  type: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  datetime: string;
  severity: string;
  reporterContact?: string;
  anonymous: boolean;
}

const ReportIncidentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [reportId, setReportId] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<IncidentFormData>({
    defaultValues: {
      anonymous: false,
      severity: 'medium'
    }
  });

  const watchAnonymous = watch('anonymous');
  const totalSteps = 3;

  const incidentTypes = [
    { value: 'theft', label: 'Theft / Burglary' },
    { value: 'assault', label: 'Assault / Violence' },
    { value: 'vandalism', label: 'Vandalism / Property Damage' },
    { value: 'fraud', label: 'Fraud / Scam' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor incident, no immediate danger' },
    { value: 'medium', label: 'Medium - Moderate concern, some risk' },
    { value: 'high', label: 'High - Serious incident, immediate attention needed' }
  ];

  const onSubmit = async (data: IncidentFormData) => {
    setSubmitStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock report ID
      const mockReportId = `CG-${Date.now().toString().slice(-6)}`;
      setReportId(mockReportId);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude);
          setValue('longitude', position.coords.longitude);
          setValue('location', `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-6">
            Your incident report has been received and is being reviewed. Your reference number is:
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <span className="text-lg font-mono font-bold text-primary-600">{reportId}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Please save this reference number for your records. You can use it to check the status of your report.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => {
                setSubmitStatus('idle');
                setCurrentStep(1);
                setReportId('');
              }}
              className="w-full"
            >
              Submit Another Report
            </Button>
            <Button variant="outline" className="w-full">
              View Crime Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Report an Incident</h1>
          <p className="mt-2 text-gray-600">
            Help keep your community safe by reporting incidents. All reports are reviewed by local authorities.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < totalSteps && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Incident Details</span>
            <span>Location & Time</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8">
          {/* Step 1: Incident Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Details</h2>
              
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Incident *
                </label>
                <select
                  {...register('type', { required: 'Please select an incident type' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select incident type...</option>
                  {incidentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-danger-600">{errors.type.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { 
                    required: 'Please provide a description',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                  })}
                  rows={4}
                  placeholder="Please describe what happened, including any relevant details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-danger-600">{errors.description.message}</p>
                )}
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level *
                </label>
                <div className="space-y-2">
                  {severityLevels.map(level => (
                    <label key={level.value} className="flex items-start">
                      <input
                        type="radio"
                        {...register('severity', { required: 'Please select a severity level' })}
                        value={level.value}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium capitalize">{level.value}</div>
                        <div className="text-sm text-gray-600">{level.label.split(' - ')[1]}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.severity && (
                  <p className="mt-1 text-sm text-danger-600">{errors.severity.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Location & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Time</h2>
              
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    {...register('location', { required: 'Please provide a location' })}
                    placeholder="Enter address or description of location..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                  >
                    Use Current Location
                  </Button>
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-danger-600">{errors.location.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time *
                </label>
                <input
                  type="datetime-local"
                  {...register('datetime', { required: 'Please provide the date and time' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {errors.datetime && (
                  <p className="mt-1 text-sm text-danger-600">{errors.datetime.message}</p>
                )}
              </div>

              {/* Anonymous Reporting */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('anonymous')}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Submit this report anonymously
                  </span>
                </label>
                <p className="mt-1 text-sm text-gray-600">
                  Anonymous reports help protect your privacy but may limit follow-up options.
                </p>
              </div>

              {/* Contact Information */}
              {!watchAnonymous && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information (Optional)
                  </label>
                  <input
                    type="email"
                    {...register('reporterContact')}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-600">
                    Providing contact information allows authorities to follow up if needed.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Report</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Incident Type: </span>
                  <span className="capitalize">{watch('type')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Description: </span>
                  <span>{watch('description')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location: </span>
                  <span>{watch('location')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date & Time: </span>
                  <span>{watch('datetime')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Severity: </span>
                  <span className="capitalize">{watch('severity')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Reporting: </span>
                  <span>{watchAnonymous ? 'Anonymous' : 'With Contact Information'}</span>
                </div>
              </div>

              <AlertBanner
                type="info"
                message="By submitting this report, you confirm that the information provided is accurate to the best of your knowledge."
              />

              {submitStatus === 'error' && (
                <AlertBanner
                  type="error"
                  message="There was an error submitting your report. Please try again."
                />
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                loading={submitStatus === 'loading'}
                disabled={submitStatus === 'loading'}
              >
                Submit Report
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncidentPage;