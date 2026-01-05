"use client";

import React from "react";

const TermsOfService = () => {
    return (
        <div className="w-full bg-white dark:bg-black relative pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Terms of Service</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-12">Effective Date: 1-12-2025</p>

                <div className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
                    <section>
                        <p className="mb-4">
                            Welcome to Estelle Learning Ltd ("Estelle", "we", "our", or "us"). These Terms of Service ("Terms") govern
                            your access to and use of our website, learning platform, content, subscriptions, and services (collectively,
                            the "Services").
                        </p>
                        <p>
                            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do
                            not use the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">1. About Estelle Learning</h2>
                        <p>
                            Estelle Learning Ltd is an education technology company that provides personal branding education for
                            founders, CEOs, creators, and company employees through digital courses, programs, workshops, and
                            enterprise training solutions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">2. Eligibility</h2>
                        <p className="mb-2">To use our Services, you must:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>Be at least 18 years old, or have parental/legal guardian consent</li>
                            <li>Have the legal capacity to enter into a binding agreement</li>
                            <li>Provide accurate and complete information during registration</li>
                        </ul>
                        <p>We reserve the right to suspend or terminate accounts that do not meet these requirements.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">3. Account Registration and Security</h2>
                        <p className="mb-2">When you create an account:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>You are responsible for maintaining the confidentiality of your login credentials</li>
                            <li>You agree to notify us immediately of any unauthorized use of your account</li>
                            <li>You are responsible for all activities that occur under your account</li>
                        </ul>
                        <p>Estelle Learning is not liable for losses resulting from unauthorized account access caused by your failure to secure your credentials.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">4. Subscriptions, Payments, and Billing</h2>

                        <h3 className="text-xl font-medium mb-2">a. Paid Services</h3>
                        <p className="mb-4">Some of our Services are offered on a subscription or one-time payment basis. Pricing details are clearly displayed at the point of purchase.</p>

                        <h3 className="text-xl font-medium mb-2">b. Payment Processing</h3>
                        <p className="mb-4">Payments are processed securely through third-party payment providers. Estelle Learning does not store your full payment card details.</p>

                        <h3 className="text-xl font-medium mb-2">c. Billing Cycle and Renewals</h3>
                        <p className="mb-4">Subscriptions may renew automatically unless canceled before the renewal date. By subscribing, you authorize us to charge your selected payment method according to the agreed billing cycle.</p>

                        <h3 className="text-xl font-medium mb-2">d. Refund Policy</h3>
                        <p>Unless otherwise stated in writing, all payments are non-refundable, including partially used subscription periods, except where required by applicable law.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">5. Use of Services</h2>
                        <p className="mb-2">You agree to use the Services only for lawful purposes and in a manner that does not:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on the rights of others</li>
                            <li>Disrupt or interfere with the platform’s operation</li>
                            <li>Attempt unauthorized access to systems or data</li>
                        </ul>
                        <p>We reserve the right to suspend or terminate access for misuse.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">6. Intellectual Property</h2>
                        <p className="mb-4">
                            All content provided through the Services, including courses, videos, text, graphics, logos, trademarks, and
                            learning materials, is owned by or licensed to Estelle Learning.
                        </p>
                        <p className="mb-2">You may not:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>Copy, reproduce, distribute, or resell content</li>
                            <li>Use content for commercial purposes without written consent</li>
                            <li>Modify or create derivative works from our materials</li>
                        </ul>
                        <p>Limited, personal, non-commercial use is permitted.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">7. User-Generated Content</h2>
                        <p className="mb-4">
                            If you submit content (such as comments, assignments, or feedback), you grant Estelle Learning a non-exclusive, royalty-free license to use, reproduce, and display such content for educational, marketing, or platform improvement purposes.
                        </p>
                        <p>You remain responsible for the content you submit.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">8. Third-Party Services and Links</h2>
                        <p>
                            Our Services may integrate or link to third-party platforms (e.g., payment providers, authentication services, social media platforms). Estelle Learning is not responsible for the content, policies, or practices of third-party services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">9. Disclaimer of Warranties</h2>
                        <p className="mb-2">The Services are provided on an "as is" and "as available" basis. While we strive for excellence, we do not guarantee that:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>The Services will be uninterrupted or error-free</li>
                            <li>Specific outcomes or results will be achieved</li>
                        </ul>
                        <p>Your use of the Services is at your own risk.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">10. Limitation of Liability</h2>
                        <p className="mb-4">
                            To the maximum extent permitted by law, Estelle Learning shall not be liable for any indirect, incidental,
                            special, or consequential damages arising from your use of the Services.
                        </p>
                        <p>
                            Our total liability for any claim shall not exceed the amount paid by you to Estelle Learning in the preceding 12 months.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">11. Termination</h2>
                        <p className="mb-4">
                            We may suspend or terminate your access to the Services at our discretion if you violate these Terms or
                            engage in conduct harmful to Estelle Learning or other users.
                        </p>
                        <p>You may terminate your account at any time by contacting us.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">12. Governing Law</h2>
                        <p>
                            These Terms are governed by and construed in accordance with the laws of the Federal Republic of
                            Nigeria, without regard to conflict of law principles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">13. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. Continued use of the Services after changes take effect
                            constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#7851A9]">14. Contact Information</h2>
                        <p className="mb-2">If you have any questions about these Terms, please contact us at:</p>
                        <p className="font-semibold">Estelle Learning Ltd</p>
                        <p>Email: <a href="mailto:info@estellelearning.com" className="text-[#7851A9] hover:underline">info@estellelearning.com</a></p>
                        <p>Website: <a href="https://www.estellelearning.com" className="text-[#7851A9] hover:underline">www.estellelearning.com</a></p>
                    </section>

                    <hr className="my-8 border-gray-200 dark:border-gray-800" />

                    <p className="text-sm text-gray-500 text-center italic">
                        These Terms are designed to protect both our learners and Estelle Learning while enabling a trusted, professional learning environment.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
