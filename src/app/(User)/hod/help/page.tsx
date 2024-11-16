import React from "react";

const HelpPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Dashboard Help Page
      </h1>

      {/* Table of Contents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Table of Contents</h2>
            <ul className="list-disc pl-5">
              <li>
                <a href="#getting-started">Getting Started</a>
              </li>
              <li>
                <a href="#account-management">Account Management</a>
              </li>
              <li>
                <a href="#dashboard-overview">Dashboard Overview</a>
              </li>
              <li>
                <a href="#feature-guides">Feature Guides</a>
              </li>
              <li>
                <a href="#troubleshooting">Troubleshooting</a>
              </li>
              <li>
                <a href="#contact-support">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-2">
          <div className="space-y-8">
            {/* Getting Started */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="getting-started" className="text-2xl font-semibold">
                  1. Getting Started
                </h3>
                <p>
                  <strong>How to Log In:</strong>
                </p>
                <p>
                  1. Open the dashboard login page. <br /> 2. Enter your email
                  address and password. <br /> 3. Click on the{" "}
                  <strong>Log In</strong> button.
                </p>

                <p>
                  <strong>Forgot Password:</strong>
                </p>
                <p>
                  If you’ve forgotten your password, follow these steps: <br />{" "}
                  1. Click the <strong>Forgot Password</strong> link on the
                  login screen. <br /> 2. Enter your registered email address.{" "}
                  <br /> 3. Follow the instructions sent to your email to reset
                  your password.
                </p>
              </div>
            </div>

            {/* Account Management */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="account-management" className="text-2xl font-semibold">
                  2. Account Management
                </h3>
                <p>
                  <strong>How to Update Account Information:</strong>
                </p>
                <p>
                  1. Navigate to the <strong>Account Settings</strong> page.{" "}
                  <br /> 2. Update your name, email, or password. <br /> 3.
                  Click <strong>Save</strong> to confirm the changes.
                </p>

                <p>
                  <strong>How to Deactivate Account:</strong>
                </p>
                <p>
                  To deactivate your account: <br /> 1. Go to{" "}
                  <strong>Account Settings</strong>. <br /> 2. Scroll down to{" "}
                  <strong>Account Deactivation</strong>. <br /> 3. Click on{" "}
                  <strong>Deactivate Account</strong> and follow the
                  instructions.
                </p>
              </div>
            </div>

            {/* Dashboard Overview */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="dashboard-overview" className="text-2xl font-semibold">
                  3. Dashboard Overview
                </h3>
                <p>
                  <strong>Main Dashboard Features:</strong>
                </p>
                <p>
                  - **Navigation Menu**: Located on the left side, it provides
                  access to all the main sections of the dashboard. <br /> -
                  **Widgets/Reports**: These give you quick insights into key
                  metrics and data points. You can customize which widgets to
                  display. <br /> - **Search Functionality**: Use the search bar
                  at the top to find specific data, reports, or other resources.
                </p>

                <p>
                  <strong>How to Customize Your Dashboard:</strong>
                </p>
                <p>
                  1. Go to the <strong>Dashboard Settings</strong> section.{" "}
                  <br /> 2. Choose which widgets or reports to display. <br />{" "}
                  3. Click <strong>Save Changes</strong> to update your view.
                </p>
              </div>
            </div>

            {/* Feature Guides */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="feature-guides" className="text-2xl font-semibold">
                  4. Feature Guides
                </h3>
                <p>
                  <strong>Using the Reporting Tools:</strong>
                </p>
                <p>
                  1. Click on the **Reports** tab in the navigation menu. <br />{" "}
                  2. Select the type of report you wish to generate (e.g.,
                  performance, trends, etc.). <br /> 3. Choose the date range
                  and filters. <br /> 4. Click **Generate Report** to view the
                  results.
                </p>

                <p>
                  <strong>Managing Data Entries:</strong>
                </p>
                <p>
                  1. Go to the **Data Entry** section. <br /> 2. Add, edit, or
                  delete records as required. <br /> 3. Ensure to **Save** after
                  making any changes to ensure they are recorded.
                </p>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="troubleshooting" className="text-2xl font-semibold">
                  5. Troubleshooting
                </h3>
                <p>
                  <strong>Issues with Logging In:</strong>
                </p>
                <p>
                  - Ensure your email and password are entered correctly. <br />{" "}
                  - If the issue persists, click the **Forgot Password** link to
                  reset your credentials. <br /> - Clear your browser cache and
                  try logging in again.
                </p>

                <p>
                  <strong>Page Not Loading:</strong>
                </p>
                <p>
                  - Refresh the page or try logging out and logging back in.{" "}
                  <br /> - Check your internet connection to ensure it is
                  stable. <br /> - If the issue persists, try using a different
                  browser.
                </p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 id="contact-support" className="text-2xl font-semibold">
                  6. Contact Support
                </h3>
                <p>
                  If you are unable to find a solution to your issue, you can
                  contact support:
                </p>
                <ul>
                  <li>
                    <strong>Email Support:</strong> support@dashboard.com
                  </li>
                  <li>
                    <strong>Live Chat:</strong> Available 9:00 AM to 5:00 PM
                    (Monday to Friday) via the chat widget on the bottom-right
                    corner of the page.
                  </li>
                  <li>
                    <strong>Phone Support:</strong> +91-XXXX-XXXX (Available
                    Monday to Friday, 9:00 AM - 6:00 PM)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
