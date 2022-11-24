interface workToRender {
  h2: string;
  media1: string[];
  media2: string[];
  media3: string[];
  media4: string[];
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

interface WorkChild {
  work: workToRender;
  changeSectionFunctions: [() => void, () => void];
}

export default WorkChild;