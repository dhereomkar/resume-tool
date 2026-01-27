export default function Footer() {
  return (
    <footer className="bg-grey900 text-background py-12">
      <div className="w-full max-w-[100rem] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4 tracking-tight">
              RESUME BUILDER
            </h3>
            <p className="font-paragraph text-sm text-grey300">
              Create professional resumes with ease. Upload, edit, and customize your resume with our intuitive builder.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 tracking-tight">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-paragraph text-sm text-grey300 hover:text-background transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/upload" className="font-paragraph text-sm text-grey300 hover:text-background transition-colors">
                  Upload Resume
                </a>
              </li>
              <li>
                <a href="/builder" className="font-paragraph text-sm text-grey300 hover:text-background transition-colors">
                  Resume Builder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 tracking-tight">
              CONTACT
            </h4>
            <p className="font-paragraph text-sm text-grey300">
              Email: contact@resumebuilder.com
            </p>
            <p className="font-paragraph text-sm text-grey300 mt-2">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-grey700 mt-12 pt-8 text-center">
          <p className="font-paragraph text-sm text-grey300">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
