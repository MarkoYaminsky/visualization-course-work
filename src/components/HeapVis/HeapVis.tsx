import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { IAppContext } from "../../types";
import { Edge } from "../Edge";
import { NodeCircle } from "../NodeCircle";
import styles from "./HeapVis.module.scss";
import { HeapNode } from "./MinHeap";

export const HeapVis: React.FC = () => {
  const context = useContext<IAppContext | null>(AppContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentArray, setCurrentArray] = useState<HeapNode[]>([]);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) =>
        prevStep + 1 < context!.nodeSteps.length ? prevStep + 1 : prevStep
      );
    }, context?.visSpeed);
    if (isPaused) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [context, isPaused]);

  useEffect(() => {
    if (context) setCurrentArray(context.nodeSteps[currentStep]);
    if (context && currentStep === context.nodeSteps.length - 1)
      setIsPaused(true);
  }, [context, currentStep]);

  useEffect(() => {
    setCurrentStep(0);
  }, [context?.nodeSteps]);

  const handleEnabledChangeStep = (option: "prev" | "next") => {
    if (!context?.nodeSteps) {
      return styles.buttonDisabled;
    } else if (option === "prev" && currentStep > 0) {
      return styles.stepButtonEnabled;
    } else if (
      option === "next" &&
      currentStep < context.nodeSteps.length - 1
    ) {
      return styles.stepButtonEnabled;
    } else {
      return styles.buttonDisabled;
    }
  };

  const handleEnabledPlay = (option: "play" | "pause") => {
    if (context?.nodeSteps) {
      if (currentStep === context.nodeSteps.length - 1) {
        return styles.buttonDisabled;
      } else if (
        isPaused &&
        option === "play" &&
        context.nodeSteps.length > 1
      ) {
        return styles.playButtonEnabled;
      } else if (option === "pause" && !isPaused) {
        return styles.pauseButtonEnabled;
      } else {
        return styles.buttonDisabled;
      }
    }
  };

  return (
    <div className={styles.heapVis}>
      <div className={styles.stepButtons}>
        <button
          className={handleEnabledChangeStep("prev")}
          onClick={() => {
            setCurrentStep((prevStep) =>
              prevStep - 1 >= 0 ? prevStep - 1 : prevStep
            );
            setIsPaused(true);
          }}
        >
          previous
        </button>
        <button
          className={handleEnabledChangeStep("next")}
          onClick={() => {
            setCurrentStep((prevStep) =>
              prevStep + 1 < context!.nodeSteps.length ? prevStep + 1 : prevStep
            );
            setIsPaused(true);
          }}
        >
          next
        </button>
      </div>
      <div className={styles.playButtons}>
        <button
          className={handleEnabledPlay("play")}
          onClick={() => setIsPaused(false)}
        >
          play
        </button>
        <button
          className={handleEnabledPlay("pause")}
          onClick={() => setIsPaused(true)}
        >
          pause
        </button>
        <div className={styles.vis}>
          {currentArray &&
            currentArray.map((node, index) => (
              <NodeCircle
                key={node.position + node.x + node.y + `-${index}`}
                positionX={node.x}
                positionY={node.y}
                value={node.value}
                visited={node.visited}
                current={node.current}
                option="heap"
                toggleNode={() => undefined}
              />
            ))}
        </div>
        {currentArray &&
          currentArray.length > 1 &&
          currentArray.map((node, index) => {
            if (index > 0) {
              return (
                <Edge
                  key={
                    node.x + node.y + node.parent!.x + node.parent!.y + index
                  }
                  childX={node.x}
                  parentX={node.parent!.x}
                  childY={node.y}
                  parentY={node.parent!.y}
                  option="heap"
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
