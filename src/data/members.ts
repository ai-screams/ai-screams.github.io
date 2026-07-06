export interface Member {
  avatarUrl?: string;
  github: string;
  name: string;
  role: string;
}

/**
 * 멤버 정보는 추후 채움 — 빈 배열이면 Team 섹션 미렌더.
 */
export const MEMBERS: Member[] = [];
