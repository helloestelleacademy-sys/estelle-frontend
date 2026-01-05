"use client";

import React from "react";

const TermsOfService = () => {
    return (
        <div className="w-full bg-white dark:bg-black relative pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Terms of Service</h1>

                <div className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed text-center">
                    <p className="text-lg">
                        Our Terms of Service are currently being updated.
                    </p>
                    <p className="text-gray-600">
                        Please check back later or contact us at <a href="mailto:info@estellelearning.com" className="text-[#7851A9] hover:underline">info@estellelearning.com</a> for more information regarding our terms regarding the use of the Estelle Learning platform.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
