import React from 'react';
import type { WeddingData } from '../types';

interface InvitationProps {
  data: WeddingData;
}

export const Invitation: React.FC<InvitationProps> = ({ data }) => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <section className="invitation-section">
      <h2 className="section-title">INVITATION</h2>
      <p className="section-subtitle">소중한 분들을 초대합니다</p>

      <div className="invitation-content">
        <div className="invitation-text">
          <p className="invitation-message">
            2020년 10월 31일,<br />
            서로에게 가장 소중한 사람이 되었고<br />
            다가오는 2026년 10월 31일,<br />
            서로의 평생이 되려 합니다.<br />
            <br />
            같은 날짜에 찾아온 새로운 시작을<br />
            함께 하셔서 축복해 주시면<br />
            더없는 기쁨으로 간직하겠습니다.
          </p>
        </div>

        <div className="parents-info">
          <div className="parent-row">
            <div className="parent-side">
              <p className="parent-label">신랑</p>
              <p className="parent-names">
                {data.parents.groom.father} · {data.parents.groom.mother}
              </p>
              <p className="parent-relation">의 {data.groom.relation}</p>
              <p className="child-name">{data.groom.name}</p>
              <button
                type="button"
                className="contact-btn"
                onClick={() => handleCall(data.groom.phone)}
              >
                연락하기
              </button>
            </div>
          </div>

          <div className="parent-row">
            <div className="parent-side">
              <p className="parent-label">신부</p>
              <p className="parent-names">
                {data.parents.bride.father} · {data.parents.bride.mother}
              </p>
              <p className="parent-relation">의 {data.bride.relation}</p>
              <p className="child-name">{data.bride.name}</p>
              <button
                type="button"
                className="contact-btn"
                onClick={() => handleCall(data.bride.phone)}
              >
                연락하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
