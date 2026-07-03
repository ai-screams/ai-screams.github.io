/**
 * 프로젝트명을 타이포 그래픽용 1~2줄 대문자 라인으로 분리.
 * 이름이 "읽히는" 수준의 변형만 허용: 구분자·카멜케이스 경계 분리,
 * 8자 초과 단일 토큰만 중간 분할. 문자 치환(그리스 문자 등) 금지.
 */
export function typoLines(name: string): string[] {
  const tokens = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let lines =
    tokens.length > 1
      ? tokens
      : name.split(/(?<=[a-z0-9])(?=[A-Z])/).filter(Boolean);
  if (lines.length === 1 && lines[0].length > 8) {
    const mid = Math.ceil(lines[0].length / 2);
    lines = [lines[0].slice(0, mid), lines[0].slice(mid)];
  }
  if (lines.length > 2) {
    lines = [lines[0], lines.slice(1).join(" ")];
  }
  return lines.map((line) => line.toUpperCase());
}
