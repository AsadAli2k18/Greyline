import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <Link to="/" className="back-button">← Back</Link>
          <h1 className="page-title">Terms & Conditions.</h1>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-text">
            <p>
              The following terms of business apply to all engagements accepted by Greyline Accountants Ltd (Company no. 16576792). All work is carried out under these terms except where changes are expressly agreed in writing.
            </p>

            <h2>1.0 Applicable law</h2>
            <p><strong>1.1</strong> The engagement and these terms are governed by English law. The courts of England shall have exclusive jurisdiction in relation to any claim, dispute or difference concerning the engagement and these terms. Any such claim, dispute or difference shall be subject to the exclusive jurisdiction of the English courts.</p>

            <h2>2.0 Client Identification</h2>
            <p><strong>2.1</strong> We are required to identify our clients for the purposes of UK anti-money laundering legislation. We may request from you, and retain, such information and documentation as we require for these purposes and/or make searches of appropriate databases.</p>

            <h2>3.0 Client money</h2>
            <p><strong>3.1</strong> We may hold money on your behalf. Such money will be held in a segregated client bank account, which is operated in accordance with ICAEW's Clients' Money Regulations.</p>
            <p><strong>3.2</strong> Client monies are held in an interest-bearing account. Interest will be paid if it exceeds £25.00 per calendar year, or if it is a significant amount, in which case it will be put in a designated interest-bearing account and paid gross.</p>
            <p><strong>3.3</strong> Client monies will be returned promptly as soon as there is no longer any reason to retain those funds. If any client monies remain unclaimed or untraced for five years, or if the firm ceases to practice, we may pay any such monies to a registered charity.</p>

            <h2>4.0 Quality of Service</h2>
            <p><strong>4.1</strong> We aim to provide you with a high-quality service. If at any time you would like to discuss with us how our service to you could be improved, or if you are dissatisfied with the service you are receiving, please let us know by contacting us at <a href="mailto:info@greylineaccountants.co.uk">info@greylineaccountants.co.uk</a>. We will look into any complaint carefully and promptly. If you are still not satisfied, you may refer the matter to ICAEW.</p>

            <h2>5.0 Confidentiality</h2>
            <p><strong>5.1</strong> Communication between us is confidential. We shall take all reasonable steps to keep your information confidential except where we are required to disclose it by law, by regulatory bodies, by our insurers or as part of an external peer review. Unless we are authorised by you to disclose information on your behalf, this undertaking will apply during and after this engagement.</p>
            <p><strong>5.2</strong> We reserve the right, for the purpose of promotional activity, training or for other business purposes, to mention that you are a client. As long as you do not object, we will assume consent to do so, but we will not disclose any confidential information.</p>

            <h2>6.0 Conflicts of interest</h2>
            <p><strong>6.1</strong> We will inform you if we become aware of any conflict of interest in our relationship with you or in our relationship with you and another client. We may be unable to provide services to you if such a conflict cannot be managed in a way that protects your interests.</p>
            <p><strong>6.2</strong> If conflicts are identified which have the potential to be managed with safeguards, those safeguards will be adopted. Where possible, this will be done on the basis of your informed consent. We reserve the right to act for other clients whose interests are or may be adverse to yours, subject to the confidentiality obligations set out above.</p>

            <h2>7.0 Data protection</h2>
            <p><strong>7.1</strong> We confirm that we will comply with the provisions of the General Data Protection Regulation (GDPR) when processing personal data about you, your directors and employees, and your clients. In order to carry out the services of this engagement and for related purposes such as updating and enhancing client records, analysis for management purposes and statutory returns, legal and regulatory compliance and crime prevention we may obtain, process, use and disclose personal data about you. We process personal data in accordance with our Data Protection Policy, which is available on request. We may process sensitive personal data, but only with your explicit consent.</p>

            <h2>8.0 Disengagement</h2>
            <p>Should we resign or be requested to resign, we will normally issue a disengagement letter to ensure that our respective responsibilities are clear. Should we have no contact with you for a period of one year or more, we may issue a disengagement letter and hence cease to act.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
