export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p>
              By accessing and using the Wardrobe App, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Use License</h2>
            <p>
              Permission is granted to temporarily use the Wardrobe App for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Maintain the security of your password and account</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Respect the rights of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Content</h2>
            <p>
              Our service allows you to upload and store images and data related to your wardrobe.
              You retain ownership of your content, but grant us a license to use it for providing the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@wardrobeapp.com.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-500">Last updated: December 2024</p>
        </div>
      </div>
    </div>
  );
}