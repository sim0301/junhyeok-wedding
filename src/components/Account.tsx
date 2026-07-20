import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaPhone, FaWonSign } from "react-icons/fa";
import type { Account as AccountType, WeddingData } from "../types";

interface AccountProps {
  data: WeddingData;
}

export const Account: React.FC<AccountProps> = ({ data }) => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  };

  const handleSms = (phone: string) => {
    window.location.href = `sms:${phone.replace(/[^0-9+]/g, "")}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  };

  const copyPrimaryAccount = (accounts: AccountType[], holder: string) => {
    const account = accounts.find((item) => item.holder === holder) ?? accounts[0];
    if (!account) return;
    copyToClipboard(`${account.bank} ${account.accountNumber}`);
  };

  return (
    <section id="account" className="account-section">
      <div className="account-hero">
        <h2 className="section-title">마음 전하실 곳</h2>
      </div>
      <p id="account-subtitle" className="section-subtitle"></p>

      <div className="account-content">
        <div className="account-column">
          <div className="account-card combined-card">
            <div className="account-person">
              <span className="family-label">신랑</span>
              <span className="family-name">{data.groom.name}</span>
              <div className="account-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleCall(data.groom.phone)}
                >
                  <FaPhone />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleSms(data.groom.phone)}
                >
                  <AiOutlineMessage />
                </button>
                <button
                  type="button"
                  className="icon-btn transfer-icon-btn"
                  onClick={() => copyPrimaryAccount(data.accounts.groom, data.groom.name)}
                >
                  <FaWonSign />
                </button>
              </div>
            </div>

            <div className="family-card">
              <p className="family-title">신랑 측 혼주</p>
              <div className="family-person">
                <span className="family-label">아버지</span>
                <span className="family-name">{data.parents.groom.father}</span>
                <div className="account-actions">
                  <button type="button" className="icon-btn">
                    <FaPhone />
                  </button>
                  <button type="button" className="icon-btn">
                    <AiOutlineMessage />
                  </button>
                  <button type="button" className="icon-btn transfer-icon-btn">
                    <FaWonSign />
                  </button>
                </div>
              </div>
              <div className="family-person">
                <span className="family-label">어머니</span>
                <span className="family-name">{data.parents.groom.mother}</span>
                <div className="account-actions">
                  <button type="button" className="icon-btn">
                    <FaPhone />
                  </button>
                  <button type="button" className="icon-btn">
                    <AiOutlineMessage />
                  </button>
                  <button type="button" className="icon-btn transfer-icon-btn">
                    <FaWonSign />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="account-column">
          <div className="account-card combined-card">
            <div className="account-person">
              <span className="family-label">신부</span>
              <span className="family-name">{data.bride.name}</span>
              <div className="account-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleCall(data.bride.phone)}
                >
                  <FaPhone />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleSms(data.bride.phone)}
                >
                  <AiOutlineMessage />
                </button>
                <button
                  type="button"
                  className="icon-btn transfer-icon-btn"
                  onClick={() => copyPrimaryAccount(data.accounts.bride, data.bride.name)}
                >
                  <FaWonSign />
                </button>
              </div>
            </div>

            <div className="family-card">
              <p className="family-title">신부 측 혼주</p>
              <div className="family-person">
                <span className="family-label">아버지</span>
                <span className="family-name">{data.parents.bride.father}</span>
                <div className="account-actions">
                  <button type="button" className="icon-btn">
                    <FaPhone />
                  </button>
                  <button type="button" className="icon-btn">
                    <AiOutlineMessage />
                  </button>
                  <button type="button" className="icon-btn transfer-icon-btn">
                    <FaWonSign />
                  </button>
                </div>
              </div>
              <div className="family-person">
                <span className="family-label">어머니</span>
                <span className="family-name">{data.parents.bride.mother}</span>
                <div className="account-actions">
                  <button type="button" className="icon-btn">
                    <FaPhone />
                  </button>
                  <button type="button" className="icon-btn">
                    <AiOutlineMessage />
                  </button>
                  <button type="button" className="icon-btn transfer-icon-btn">
                    <FaWonSign />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
