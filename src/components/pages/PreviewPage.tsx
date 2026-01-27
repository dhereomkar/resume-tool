import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { UserResumes, ResumeTemplates } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function PreviewPage() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const resumeId = urlParams.get('id');
  const templateId = urlParams.get('template');

  const [resume, setResume] = useState<UserResumes | null>(null);
  const [template, setTemplate] = useState<ResumeTemplates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!resumeId || !templateId) {
      navigate('/builder');
      return;
    }

    setIsLoading(true);
    try {
      const [resumeData, templateData] = await Promise.all([
        BaseCrudService.getById<UserResumes>('resumes', resumeId),
        BaseCrudService.getById<ResumeTemplates>('resumetemplates', templateId),
      ]);

      setResume(resumeData);
      setTemplate(templateData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('PDF download functionality would be implemented here');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!resume || !template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Resume not found
          </h2>
          <button
            onClick={() => navigate('/builder')}
            className="bg-primary text-primary-foreground font-paragraph font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
          >
            Back to Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey100">
      <div className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-paragraph text-base font-medium"
            >
              <ArrowLeft size={20} />
              Back to Builder
            </button>
            <button
              onClick={handleDownload}
              className="bg-primary text-primary-foreground font-paragraph font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            RESUME PREVIEW
          </h1>
          <p className="font-paragraph text-base text-secondary mb-12">
            Template: {template.templateName}
          </p>

          {/* Resume Preview */}
          <div className="bg-background border border-grey300 rounded-lg p-12 max-w-4xl mx-auto shadow-sm">
            {/* Template 1: Classic */}
            {template.layoutId === 'classic' && (
              <div className="space-y-8">
                <div className="text-center border-b border-grey300 pb-6">
                  <h2 className="font-heading text-4xl font-bold text-foreground mb-3">
                    {resume.fullName || 'Your Name'}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 font-paragraph text-sm text-secondary">
                    {resume.email && <span>{resume.email}</span>}
                    {resume.phoneNumber && <span>•</span>}
                    {resume.phoneNumber && <span>{resume.phoneNumber}</span>}
                  </div>
                </div>

                {resume.skills && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 uppercase">
                      Skills
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.skills}
                    </p>
                  </div>
                )}

                {resume.education && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 uppercase">
                      Education
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.education}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Template 2: Modern */}
            {template.layoutId === 'modern' && (
              <div className="space-y-8">
                <div className="bg-grey900 text-background p-8 -m-12 mb-8 rounded-t-lg">
                  <h2 className="font-heading text-4xl font-bold mb-3">
                    {resume.fullName || 'Your Name'}
                  </h2>
                  <div className="flex flex-wrap gap-4 font-paragraph text-sm">
                    {resume.email && <span>{resume.email}</span>}
                    {resume.phoneNumber && <span>|</span>}
                    {resume.phoneNumber && <span>{resume.phoneNumber}</span>}
                  </div>
                </div>

                {resume.skills && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-3 uppercase tracking-wide">
                      Skills
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.skills}
                    </p>
                  </div>
                )}

                {resume.education && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-3 uppercase tracking-wide">
                      Education
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.education}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Template 3: Minimal */}
            {template.layoutId === 'minimal' && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-heading text-5xl font-bold text-foreground mb-4 tracking-tight">
                    {resume.fullName || 'Your Name'}
                  </h2>
                  <div className="font-paragraph text-base text-secondary space-y-1">
                    {resume.email && <div>{resume.email}</div>}
                    {resume.phoneNumber && <div>{resume.phoneNumber}</div>}
                  </div>
                </div>

                {resume.skills && (
                  <div>
                    <div className="border-b-2 border-foreground pb-2 mb-4">
                      <h3 className="font-heading text-lg font-semibold text-foreground uppercase tracking-wider">
                        Skills
                      </h3>
                    </div>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.skills}
                    </p>
                  </div>
                )}

                {resume.education && (
                  <div>
                    <div className="border-b-2 border-foreground pb-2 mb-4">
                      <h3 className="font-heading text-lg font-semibold text-foreground uppercase tracking-wider">
                        Education
                      </h3>
                    </div>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {resume.education}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Default fallback */}
            {!['classic', 'modern', 'minimal'].includes(template.layoutId || '') && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-4xl font-bold text-foreground mb-3">
                    {resume.fullName || 'Your Name'}
                  </h2>
                  <div className="font-paragraph text-base text-secondary">
                    {resume.email && <div>{resume.email}</div>}
                    {resume.phoneNumber && <div>{resume.phoneNumber}</div>}
                  </div>
                </div>

                {resume.skills && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                      Skills
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      {resume.skills}
                    </p>
                  </div>
                )}

                {resume.education && (
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                      Education
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      {resume.education}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
