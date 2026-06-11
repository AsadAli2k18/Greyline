import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <Link to="/" className="back-button">← Back</Link>
          <h1 className="page-title">Privacy policy.</h1>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-text">
            <p>
              This policy informs you about the collection, use, storage and analysis of your data. For more information, please refer to our Terms & Conditions. This policy may be updated from time to time.
            </p>

            <h2>Collection, Use and Storage of Information</h2>
            <p>
              We collect, use and store information about you for the purposes of providing you with our services, communicating with you, and for marketing purposes. We may also use your information to improve our services and to comply with legal obligations.
            </p>
            <p>
              We will hold your information for as long as necessary to provide you with our services and to comply with legal obligations. We may also retain your information for a reasonable period after you cease to use our services for the purposes of resolving any disputes or enforcing our agreements.
            </p>
            <p>
              We collect information about you in a variety of ways, including when you provide it to us directly, when you use our services, and when you visit our website. We may also collect information about you from third parties, such as credit reference agencies or other service providers.
            </p>
            <p>
              We take appropriate measures to ensure that your information is kept secure and is protected against unauthorised access, use, disclosure, alteration or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>ActiveCampaign usage</h2>
            <p>
              We use ActiveCampaign to send newsletters and marketing communications. ActiveCampaign is GDPR compliant and stores your email address and name. If you would like to request that we remove your data from ActiveCampaign, please contact us at <a href="mailto:info@greylineaccountants.co.uk">info@greylineaccountants.co.uk</a>.
            </p>
            <p>
              You can unsubscribe from our marketing communications at any time by clicking the unsubscribe link in any email we send you, or by contacting us directly.
            </p>

            <h2>International Transfer of Information</h2>
            <p>
              We may transfer your information to countries outside the European Economic Area (EEA) for the purposes of providing you with our services. Where we do so, we will ensure that appropriate safeguards are in place to protect your information in accordance with this policy.
            </p>
            <p>
              We will not publish your personal data (including photographs) on our website without your explicit consent. If you have provided us with your consent to publish your personal data, you may withdraw this consent at any time by contacting us.
            </p>

            <h2>Other Information</h2>
            <p>
              We will only send you marketing communications if you have given us your explicit consent to do so. We may also contact you for market research purposes, but you can opt out of this at any time by contacting us.
            </p>
            <p>
              You can amend your contact preferences at any time by contacting us. We will not sell your information to third parties, but we may share your information with third parties who provide services to us, such as IT service providers, or where we are required to do so by law.
            </p>
            <p>
              We may record telephone calls for training and monitoring purposes. If you would like to access your personal data, please write to us at the address below. We will respond to your request within 28 days. We may charge a reasonable administration fee for providing you with a copy of your personal data.
            </p>
            <p>
              If you make a Subject Access Request (SAR) under the General Data Protection Regulation (GDPR), we will provide you with a copy of your personal data within one month of receiving your request. We may extend this period by a further two months if your request is complex or if we have received a large number of requests. We will inform you of any extension within one month of receiving your request, together with the reasons for the delay.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
