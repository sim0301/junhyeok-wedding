import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaPhone, FaWonSign } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { Account as AccountType, WeddingData } from "../types";

interface AccountProps {
  data: WeddingData;
}

export const Account: React.FC<AccountProps> = ({ data }) => {
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(null);

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

  const openAccountModal = (accounts: AccountType[], holder: string) => {
    const account = accounts.find((item) => item.holder === holder) ?? accounts[0];
    if (!account) return;
    setSelectedAccount(account);
    document.body.style.overflow = "hidden";
    window.history.pushState({ accountModalOpen: true }, "");
  };

  const closeAccountModal = () => {
    setSelectedAccount(null);
    document.body.style.overflow = "unset";
  };

  // 뒤로가기 버튼으로도 모달이 닫히게 처리
  useEffect(() => {
    const handlePopState = () => {
      if (selectedAccount) {
        closeAccountModal();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedAccount]);

  return (
    <section id="account" className="account-section">
      <div className="account-hero">
        <h2 className="section-title">ACCOUNT</h2>
      </div>
      <p id="account-subtitle" className="section-subtitle">마음 전하실 곳</p>

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
                  onClick={() => openAccountModal(data.accounts.groom, data.groom.name)}
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
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleCall(data.parents.groom.fatherPhone ?? data.groom.phone)}
                  >
                    <FaPhone />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleSms(data.parents.groom.fatherPhone ?? data.groom.phone)}
                  >
                    <AiOutlineMessage />
                  </button>
                  <button
                    type="button"
                    className="icon-btn transfer-icon-btn"
                    onClick={() => openAccountModal(data.accounts.groom, data.parents.groom.father)}
                  >
                    <FaWonSign />
                  </button>
                </div>
              </div>
              <div className="family-person">
                <span className="family-label">어머니</span>
                <span className="family-name">{data.parents.groom.mother}</span>
                <div className="account-actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleCall(data.parents.groom.motherPhone ?? data.groom.phone)}
                  >
                    <FaPhone />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleSms(data.parents.groom.motherPhone ?? data.groom.phone)}
                  >
                    <AiOutlineMessage />
                  </button>
                  <button
                    type="button"
                    className="icon-btn transfer-icon-btn"
                    onClick={() => openAccountModal(data.accounts.groom, data.parents.groom.mother)}
                  >
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
                  onClick={() => openAccountModal(data.accounts.bride, data.bride.name)}
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
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleCall(data.parents.bride.fatherPhone ?? data.bride.phone)}
                  >
                    <FaPhone />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleSms(data.parents.bride.fatherPhone ?? data.bride.phone)}
                  >
                    <AiOutlineMessage />
                  </button>
                  <button
                    type="button"
                    className="icon-btn transfer-icon-btn"
                    onClick={() => openAccountModal(data.accounts.bride, data.parents.bride.father)}
                  >
                    <FaWonSign />
                  </button>
                </div>
              </div>
              <div className="family-person">
                <span className="family-label">어머니</span>
                <span className="family-name">{data.parents.bride.mother}</span>
                <div className="account-actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleCall(data.parents.bride.motherPhone ?? data.bride.phone)}
                  >
                    <FaPhone />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleSms(data.parents.bride.motherPhone ?? data.bride.phone)}
                  >
                    <AiOutlineMessage />
                  </button>
                  <button
                    type="button"
                    className="icon-btn transfer-icon-btn"
                    onClick={() => openAccountModal(data.accounts.bride, data.parents.bride.mother)}
                  >
                    <FaWonSign />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedAccount && (
        <div className="account-modal-overlay" onClick={closeAccountModal}>
          <div
            className="transfer-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="account-modal-close"
              onClick={closeAccountModal}
              aria-label="닫기"
            >
              <IoClose />
            </button>

            <div className="transfer-modal-header">
              <h3 className="account-modal-title">계좌번호</h3>
              <p className="transfer-modal-subtitle">
                축하하는 마음을 전해주셔서 감사합니다
              </p>
            </div>

            <div className="transfer-modal-list">
              <div className="transfer-modal-card">
                <div>
                  <p className="transfer-modal-bank">{selectedAccount.bank}</p>
                  <p className="transfer-modal-holder">{selectedAccount.holder}</p>
                  <p className="transfer-modal-number">{selectedAccount.accountNumber}</p>
                </div>
                <button
                  type="button"
                  className="transfer-copy-btn"
                  onClick={() =>
                    copyToClipboard(`${selectedAccount.bank} ${selectedAccount.accountNumber}`)
                  }
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
