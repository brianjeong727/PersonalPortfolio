import type { Metadata } from "next";
import Link from "next/link";

// Work in progress. Described at the level of approach: no unpublished model scores, no lab-mates' names.
export const metadata: Metadata = {
  title: "PittNAIL",
  description: "Turning a clinical practice guideline for Alzheimer's evaluation into a multi-agent LLM workflow, tested on ADNI. In progress.",
};

const TASKS = [
  {
    task: "Initial cognitive assessment",
    out: "Cognitively normal, mild cognitive impairment, or dementia, with the evidence behind it.",
  },
  {
    task: "Referral decision",
    out: "Whether the case should go to a specialist, following the guideline's own criteria.",
  },
  {
    task: "Missing-information check",
    out: "Which tests the guideline expects that the record doesn't have yet.",
  },
];

export default function PittnailPage() {
  return (
    <div className="cs">
      <Link className="back" href="/#pittnail">← All work</Link>

      <header className="cs-hero">
        <h1>PittNAIL</h1>
        <p className="line">
          Turning a clinical guideline for Alzheimer&rsquo;s evaluation into a multi-agent LLM workflow that can be
          checked against real patient data.
        </p>
        <dl className="facts">
          <div><dt>Role</dt><dd>Generative AI Software Engineer</dd></div>
          <div><dt>Lab</dt><dd>Clinical NLP &amp; AI Innovation Lab, Pitt</dd></div>
          <div><dt>Timeline</dt><dd>Oct 2026 – now</dd></div>
          <div><dt>Status</dt><dd>In progress</dd></div>
        </dl>
      </header>

      <section className="section">
        <h2>The question</h2>
        <div className="body">
          <p>
            Clinical practice guidelines tell primary-care doctors how to evaluate suspected Alzheimer&rsquo;s disease,
            but they&rsquo;re written as prose for people. The lab&rsquo;s question is whether a guideline can be turned
            into an executable workflow of LLM agents that is verifiable and reproducible: every step traceable
            back to a recommendation, every output checkable against a reference label.
          </p>
          <p>
            We started from the Alzheimer&rsquo;s Association&rsquo;s primary-care guideline and the ADNI study, a large
            longitudinal dataset with cognitive tests, functional scales, medical history, imaging, and biomarkers.
            The guideline is broken into concrete tasks, and each task&rsquo;s inputs and outputs are mapped to ADNI
            tables.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>The tasks</h2>
        <div className="cards">
          {TASKS.map((t) => (
            <div className="card" key={t.task}>
              <span className="label">Task</span>
              <p>{t.task}</p>
              <span className="label">Output</span>
              <p>{t.out}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>My part</h2>
        <div className="body">
          <p>
            I own the engineering side. That means three things:
          </p>
          <ul>
            <li>
              <b>The agent workflow.</b>{" "}A LangGraph graph where each node is one guideline step with a narrow view
              of the patient record, and later nodes reconcile disagreements before a final call.
            </li>
            <li>
              <b>Case retrieval.</b>{" "}A vector store of past cases, so an agent can reason from similar patients
              instead of from the prompt alone.
            </li>
            <li>
              <b>The evaluation harness.</b>{" "}The same train/test split, metrics, and controls for every system, so
              the agents are compared with classical baselines on equal terms.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>The first hard problem: leakage</h2>
        <div className="body">
          <p>
            Before building agents, we needed honest baselines: logistic regression, random forest, and XGBoost on the
            same diagnosis task. The catch is in the data itself.
          </p>
          <p>
            ADNI&rsquo;s diagnostic label is partly <i>defined</i> by some of its own measurements. The Clinical Dementia
            Rating, for example, is part of the criteria clinicians use to assign the label. A model that sees it is
            reading the answer key. This is incorporation bias, and it inflates every system, LLM agents included.
          </p>
          <p>
            So the harness starts with a screen. Each of 5,851 candidate features is tested for association with the
            label, corrected for multiple comparisons. Features that are part of the label&rsquo;s definition, or that
            leak it, are flagged. That was 520 of them. Only what&rsquo;s left is fed to any model. After the screen, the
            features that matter most are the ones a primary-care doctor would actually have: a cognitive screening
            score, a daily-function questionnaire, and whether the patient reports memory problems.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Where it stands</h2>
        <div className="body">
          <p>
            Done: the guideline-to-task mapping, the leakage screen, and the classical baselines. In progress: the
            agent workflow and case retrieval, which will run through the same harness so the comparison is fair.
            Results will go here once there&rsquo;s something worth reporting.
          </p>
        </div>
      </section>
    </div>
  );
}
