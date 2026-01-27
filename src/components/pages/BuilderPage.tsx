import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { UserResumes, ResumeTemplates } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function BuilderPage() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const resumeId = urlParams.get('id');

  const [formData, setFormData] = useState<Partial<UserResumes>>({
    fullName: '',
    email: '',
    phoneNumber: '',
    skills: '',
    education: '',
  });
  const [templates, setTemplates] = useState<ResumeTemplates[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load templates
      const templatesResult = await BaseCrudService.getAll<ResumeTemplates>('resumetemplates');
      setTemplates(templatesResult.items);
      if (templatesResult.items.length > 0) {
        setSelectedTemplate(templatesResult.items[0]._id);
      }

      // Load existing resume if ID provided
      if (resumeId) {
        const resume = await BaseCrudService.getById<UserResumes>('resumes', resumeId);
        if (resume) {
          setFormData({
            fullName: resume.fullName || '',
            email: resume.email || '',
            phoneNumber: resume.phoneNumber || '',
            skills: resume.skills || '',
            education: resume.education || '',
          });
        }
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const resumeData: UserResumes = {
        _id: resumeId || crypto.randomUUID(),
        fullName: formData.fullName || '',
        email: formData.email || '',
        phoneNumber: formData.phoneNumber || '',
        skills: formData.skills || '',
        education: formData.education || '',
      };

      if (resumeId) {
        await BaseCrudService.update('resumes', resumeData);
        setSaveMessage('Resume updated successfully!');
      } else {
        await BaseCrudService.create('resumes', resumeData);
        setSaveMessage('Resume saved successfully!');
        // Update URL with new ID
        window.history.replaceState({}, '', `/builder?id=${resumeData._id}`);
      }
    } catch (err) {
      setSaveMessage('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handlePreview = () => {
    if (resumeId) {
      navigate(`/preview?id=${resumeId}&template=${selectedTemplate}`);
    } else {
      setSaveMessage('Please save your resume first before previewing.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const selectedTemplateData = templates.find(t => t._id === selectedTemplate);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            RESUME BUILDER
          </h1>
          <p className="font-paragraph text-lg text-secondary mb-12">
            Create or edit your resume with our intuitive builder
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form Section */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 tracking-tight">
                  RESUME DETAILS
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="font-paragraph text-sm font-medium text-foreground block mb-2">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-grey300 rounded font-paragraph text-base text-foreground focus:outline-none focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-foreground block mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-grey300 rounded font-paragraph text-base text-foreground focus:outline-none focus:border-primary"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-foreground block mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-grey300 rounded font-paragraph text-base text-foreground focus:outline-none focus:border-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-foreground block mb-2">
                      SKILLS
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-grey300 rounded font-paragraph text-base text-foreground focus:outline-none focus:border-primary resize-none"
                      placeholder="JavaScript, React, Node.js, etc."
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-foreground block mb-2">
                      EDUCATION
                    </label>
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-grey300 rounded font-paragraph text-base text-foreground focus:outline-none focus:border-primary resize-none"
                      placeholder="Bachelor's Degree in Computer Science, University Name, 2020"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-primary text-primary-foreground font-paragraph font-medium px-6 py-4 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {isSaving ? 'Saving...' : 'Save Resume'}
                  </button>
                  <button
                    onClick={handlePreview}
                    className="flex-1 bg-transparent text-primary font-paragraph font-medium px-6 py-4 rounded border border-primary hover:bg-grey100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={20} />
                    Preview
                  </button>
                </div>

                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-3 bg-grey100 border border-grey300 rounded"
                  >
                    <p className="font-paragraph text-sm text-foreground">{saveMessage}</p>
                  </motion.div>
                )}
              </div>

              {/* Template Selection Section */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 tracking-tight">
                  SELECT TEMPLATE
                </h2>

                {templates.length === 0 ? (
                  <div className="bg-grey100 border border-grey300 rounded p-8 text-center">
                    <p className="font-paragraph text-base text-secondary">
                      No templates available
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {templates.map((template) => (
                      <motion.div
                        key={template._id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedTemplate(template._id)}
                        className={`cursor-pointer border-2 rounded p-6 transition-all ${
                          selectedTemplate === template._id
                            ? 'border-primary bg-grey100'
                            : 'border-grey300 bg-background hover:border-grey500'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={{
                                borderColor: selectedTemplate === template._id ? '#007AFF' : '#D1D1D6'
                              }}
                            >
                              {selectedTemplate === template._id && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                              {template.templateName}
                            </h3>
                            {template.description && (
                              <p className="font-paragraph text-sm text-secondary mb-3">
                                {template.description}
                              </p>
                            )}
                            {template.isPremium && (
                              <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs font-medium px-3 py-1 rounded">
                                PREMIUM
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
