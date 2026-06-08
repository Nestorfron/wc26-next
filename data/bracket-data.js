export const bracket = {
    round32: [
      { id: "r32-1", label: "Match 65", homeName: "1° Grupo A", awayName: "3° Grupo C" },
      { id: "r32-2", label: "Match 66", homeName: "2° Grupo B", awayName: "2° Grupo F" },
      { id: "r32-3", label: "Match 67", homeName: "1° Grupo C", awayName: "3° Grupo H" },
      { id: "r32-4", label: "Match 68", homeName: "1° Grupo D", awayName: "2° Grupo E" },
  
      { id: "r32-5", label: "Match 69", homeName: "1° Grupo E", awayName: "3° Grupo A" },
      { id: "r32-6", label: "Match 70", homeName: "2° Grupo C", awayName: "2° Grupo H" },
      { id: "r32-7", label: "Match 71", homeName: "1° Grupo F", awayName: "3° Grupo G" },
      { id: "r32-8", label: "Match 72", homeName: "1° Grupo G", awayName: "2° Grupo D" },
  
      { id: "r32-9", label: "Match 73", homeName: "1° Grupo H", awayName: "3° Grupo B" },
      { id: "r32-10", label: "Match 74", homeName: "2° Grupo A", awayName: "2° Grupo G" },
      { id: "r32-11", label: "Match 75", homeName: "1° Grupo I", awayName: "3° Grupo E" },
      { id: "r32-12", label: "Match 76", homeName: "1° Grupo J", awayName: "2° Grupo K" },
  
      { id: "r32-13", label: "Match 77", homeName: "1° Grupo K", awayName: "3° Grupo D" },
      { id: "r32-14", label: "Match 78", homeName: "2° Grupo I", awayName: "2° Grupo L" },
      { id: "r32-15", label: "Match 79", homeName: "1° Grupo L", awayName: "3° Grupo F" },
      { id: "r32-16", label: "Match 80", homeName: "2° Grupo J", awayName: "3° Grupo I" },
    ],
  
    round16: [
      { id: "r16-1", label: "Match 81", homeName: "Winner M65", awayName: "Winner M66" },
      { id: "r16-2", label: "Match 82", homeName: "Winner M67", awayName: "Winner M68" },
      { id: "r16-3", label: "Match 83", homeName: "Winner M69", awayName: "Winner M70" },
      { id: "r16-4", label: "Match 84", homeName: "Winner M71", awayName: "Winner M72" },
  
      { id: "r16-5", label: "Match 85", homeName: "Winner M73", awayName: "Winner M74" },
      { id: "r16-6", label: "Match 86", homeName: "Winner M75", awayName: "Winner M76" },
      { id: "r16-7", label: "Match 87", homeName: "Winner M77", awayName: "Winner M78" },
      { id: "r16-8", label: "Match 88", homeName: "Winner M79", awayName: "Winner M80" },
    ],
  
    quarters: [
      { id: "qf-1", label: "Quarter-final 1", homeName: "Winner M81", awayName: "Winner M82" },
      { id: "qf-2", label: "Quarter-final 2", homeName: "Winner M83", awayName: "Winner M84" },
      { id: "qf-3", label: "Quarter-final 3", homeName: "Winner M85", awayName: "Winner M86" },
      { id: "qf-4", label: "Quarter-final 4", homeName: "Winner M87", awayName: "Winner M88" },
    ],
  
    semi: [
      { id: "sf-1", label: "Semi-final 1", homeName: "Winner QF1", awayName: "Winner QF2" },
      { id: "sf-2", label: "Semi-final 2", homeName: "Winner QF3", awayName: "Winner QF4" },
    ],
  
    final: [
      { id: "final", label: "Final", homeName: "Winner SF1", awayName: "Winner SF2" },
    ],
  };


  export const leftBracket = {
    round32: bracket.round32.slice(0, 8),
    round16: bracket.round16.slice(0, 4),
    quarters: bracket.quarters.slice(0, 2),
    semi: [bracket.semi[0]],
  };
  
  export const rightBracket = {
    round32: bracket.round32.slice(8),
    round16: bracket.round16.slice(4),
    quarters: bracket.quarters.slice(2),
    semi: [bracket.semi[1]],
  };