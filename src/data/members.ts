export interface Member {
  avatarUrl?: string;
  github: string;
  name: string;
  role: string;
}

/**
 * 멤버 정보는 추후 채움 — 빈 배열이면 Team 섹션 미렌더.
 * 멤버 추가 시 TeamSection 함께 수정할 것: (1) last:border-r-0는 다중 행 그리드에서
 * 행별 우측 보더가 틀어짐 — nth-child 기반으로 교체, (2) 멤버 링크 44px 터치 타겟 보장.
 */
export const MEMBERS: Member[] = [];
