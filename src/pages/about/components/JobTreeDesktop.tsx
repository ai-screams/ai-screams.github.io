import { type ReactElement } from "react";
import { type JobTreeViewModel } from "../types";
import { JobTreeCard } from "./JobTreeCard";

interface JobTreeDesktopProps {
  viewModel: JobTreeViewModel;
}

export function JobTreeDesktop({
  viewModel,
}: JobTreeDesktopProps): ReactElement {
  return (
    <div
      className="hidden items-center gap-x-0 gap-y-3 pb-2 md:grid"
      style={{
        gridTemplateColumns: "auto auto 1fr",
        gridTemplateRows: `repeat(${viewModel.branches.length}, auto)`,
      }}
    >
      <div
        style={{
          gridColumn: "1",
          gridRow: `1 / ${viewModel.branches.length + 1}`,
        }}
      >
        <JobTreeCard
          node={viewModel.trunk.node}
          styles={viewModel.trunk.styles}
        />
      </div>
      {viewModel.branches.map((branchView, branchIndex) => (
        <div className="contents" key={branchView.branch.id}>
          <span
            className="px-1 font-pixel text-sm leading-none sm:px-2"
            style={{
              color: branchView.isBrand
                ? "var(--color-brand-300)"
                : "var(--color-accent-300)",
              gridColumn: "2",
              gridRow: `${branchIndex + 1}`,
            }}
          >
            {branchView.isBrand ? "╱" : "╲"}
          </span>
          <div
            className="flex items-center gap-1 sm:gap-2"
            style={{
              gridColumn: "3",
              gridRow: `${branchIndex + 1}`,
            }}
          >
            <span aria-hidden="true" className="mr-1 flex-shrink-0 text-sm">
              {branchView.branch.icon}
            </span>
            {branchView.nodes.map((nodeView, nodeIndex) => (
              <div
                className="flex items-center gap-1 sm:gap-2"
                key={nodeView.node.id}
              >
                {nodeIndex > 0 ? (
                  <span
                    className="flex-shrink-0 font-pixel text-[10px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    →
                  </span>
                ) : null}
                <JobTreeCard node={nodeView.node} styles={nodeView.styles} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
