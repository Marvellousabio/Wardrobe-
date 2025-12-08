export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account,
              upload clothing items, or add events to your wardrobe planner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p>
              We use the information to provide, maintain, and improve our wardrobe management services,
              including generating outfit recommendations and storing your wardrobe data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
            <p>
              Your wardrobe data is stored securely in Firebase Firestore. Images uploaded may be stored
              in Firebase Storage or other cloud services for processing and display.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@wardrobeapp.com.
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