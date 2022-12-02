import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { IAppContext } from "../../types";
import { HeapNodeCircle } from "../HeapNodeCircle";
import styles from "./HeapVis.module.scss";
import { HeapNode } from "./MinHeap";

export const HeapVis: React.FC = () => {
  const context = useContext<IAppContext | null>(AppContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentArray, setCurrentArray] = useState<HeapNode[]>([]);

  useEffect(() => {
    console.log("step", currentStep);
    if (context && context.nodeSteps) setCurrentArray(context?.nodeSteps[currentStep]);  
  }, [context, currentStep]);

  console.log("array");
  
  console.log(currentArray);
  

  return (
    <div className="heapVis">
      <button className="previous" onClick={() => setCurrentStep(currentStep => currentStep - 1)}>previous</button>
      <button className="next" onClick={() => setCurrentStep(currentStep => currentStep + 1)}>next</button>
      <div className={styles.vis}>
        {currentArray && currentArray.map((node, index) => (
          <HeapNodeCircle
            key={node.position + index + node.x + node.y}
            positionX={node.x}
            positionY={node.y}
            value={node.value}
          />
        ))}
      </div>
    </div>
  );
};
