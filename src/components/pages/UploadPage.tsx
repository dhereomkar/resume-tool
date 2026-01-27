import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { UserResumes } from '@/entities';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<Partial<UserResumes> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
      setExtractedData(null);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // Simple text extraction simulation
    // In a real app, this would use a PDF parsing library
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate extraction with placeholder text
        resolve(reader.result as string);
      };
      reader.readAsText(file);
    });
  };

  const parseResumeData = (text: string): Partial<UserResumes> => {
    // Simple regex-based extraction
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    
    const email = text.match(emailRegex)?.[0] || '';
    const phoneNumber = text.match(phoneRegex)?.[0] || '';
    
    // Extract name (assume first line or first capitalized words)
    const lines = text.split('\n').filter(line => line.trim());
    const fullName = lines[0]?.trim() || '';
    
    // Extract skills (look for common keywords)
    const skillsSection = text.toLowerCase().includes('skills') 
      ? text.substring(text.toLowerCase().indexOf('skills'))
      : '';
    const skills = skillsSection.substring(0, 200).trim();
    
    // Extract education (look for common keywords)
    const educationSection = text.toLowerCase().includes('education') 
      ? text.substring(text.toLowerCase().indexOf('education'))
      : '';
    const education = educationSection.substring(0, 200).trim();

    return {
      fullName,
      email,
      phoneNumber,
      skills: skills || 'No skills detected',
      education: education || 'No education detected',
    };
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      
      // Parse resume data
      const parsed = parseResumeData(text);
      
      setExtractedData(parsed);
    } catch (err) {
      setError('Failed to process PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveAndContinue = async () => {
    if (!extractedData) return;

    try {
      const resumeData: UserResumes = {
        _id: crypto.randomUUID(),
        fullName: extractedData.fullName || '',
        email: extractedData.email || '',
        phoneNumber: extractedData.phoneNumber || '',
        skills: extractedData.skills || '',
        education: extractedData.education || '',
      };

      await BaseCrudService.create('resumes', resumeData);
      
      // Navigate to builder with the resume ID
      navigate(`/builder?id=${resumeData._id}`);
    } catch (err) {
      setError('Failed to save resume. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            UPLOAD RESUME
          </h1>
          <p className="font-paragraph text-lg text-secondary mb-12">
            Upload your PDF resume to automatically extract information
          </p>

          {/* Upload Section */}
          <div className="bg-grey100 border-2 border-dashed border-grey300 rounded p-12 mb-12 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex flex-col items-center"
            >
              <Upload size={48} className="text-grey500 mb-4" />
              <span className="font-paragraph text-base text-foreground font-medium mb-2">
                {file ? file.name : 'Click to upload PDF'}
              </span>
              <span className="font-paragraph text-sm text-secondary">
                PDF files only, max 10MB
              </span>
            </label>
          </div>

          {error && (
            <div className="bg-destructive text-destructive-foreground px-6 py-4 rounded mb-8">
              <p className="font-paragraph text-base">{error}</p>
            </div>
          )}

          {file && !extractedData && (
            <div className="flex justify-center mb-12">
              <button
                onClick={handleUpload}
                disabled={isProcessing}
                className="bg-primary text-primary-foreground font-paragraph font-medium px-8 py-4 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Extract Information'}
              </button>
            </div>
          )}

          {/* Extracted Data Section */}
          {extractedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-background border border-grey300 rounded p-8 mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={24} className="text-primary" />
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  EXTRACTED INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-paragraph text-sm font-medium text-secondary block mb-2">
                    FULL NAME
                  </label>
                  <p className="font-paragraph text-base text-foreground">
                    {extractedData.fullName || 'Not detected'}
                  </p>
                </div>

                <div>
                  <label className="font-paragraph text-sm font-medium text-secondary block mb-2">
                    EMAIL
                  </label>
                  <p className="font-paragraph text-base text-foreground">
                    {extractedData.email || 'Not detected'}
                  </p>
                </div>

                <div>
                  <label className="font-paragraph text-sm font-medium text-secondary block mb-2">
                    PHONE NUMBER
                  </label>
                  <p className="font-paragraph text-base text-foreground">
                    {extractedData.phoneNumber || 'Not detected'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="font-paragraph text-sm font-medium text-secondary block mb-2">
                    SKILLS
                  </label>
                  <p className="font-paragraph text-base text-foreground">
                    {extractedData.skills || 'Not detected'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="font-paragraph text-sm font-medium text-secondary block mb-2">
                    EDUCATION
                  </label>
                  <p className="font-paragraph text-base text-foreground">
                    {extractedData.education || 'Not detected'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => {
                    setFile(null);
                    setExtractedData(null);
                  }}
                  className="bg-transparent text-secondary font-paragraph font-medium px-8 py-4 rounded border border-grey300 hover:bg-grey100 transition-colors"
                >
                  Upload Different File
                </button>
                <button
                  onClick={handleSaveAndContinue}
                  className="bg-primary text-primary-foreground font-paragraph font-medium px-8 py-4 rounded hover:opacity-90 transition-opacity"
                >
                  Save & Continue to Builder
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
