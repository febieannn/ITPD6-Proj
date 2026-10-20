
import { useMemo, useState } from "react";
import "./App.css";

const TOPICS = {
  HTML: {
    label: "HTML fundamentals",
    description: "Structure and content",
    icon: "</>",
    lessons: [
      "Review HTML document structure",
      "Practice headings, links, and images",
      "Build a semantic HTML page",
    ],
  },
  CSS: {
    label: "CSS styling",
    description: "Styles and layouts",
    icon: "#",
    lessons: [
      "Review CSS selectors and properties",
      "Practice the box model and spacing",
      "Build a responsive card layout",
    ],
  },
  JavaScript: {
    label: "JavaScript programming",
    description: "Web programming",
    icon: "JS",
    lessons: [
      "Review variables, data types, and operators",
      "Practice functions, arrays, and objects",
      "Build an interactive webpage",
    ],
  },
  Python: {
    label: "Python programming",
    description: "General programming",
    icon: "Py",
    lessons: [
      "Review variables, loops, and conditions",
      "Practice functions and lists",
      "Build a simple Python application",
    ],
  },
  Java: {
    label: "Java programming",
    description: "Object-oriented programming",
    icon: "Ja",
    lessons: [
      "Review classes and objects",
      "Practice methods and inheritance",
      "Build a simple Java program",
    ],
  },
  "C++": {
    label: "C++ programming",
    description: "Systems programming",
    icon: "C+",
    lessons: [
      "Review variables, data types, and operators",
      "Practice loops, functions, and arrays",
      "Build a basic C++ console application",
    ],
  },
  PHP: {
    label: "PHP development",
    description: "Server-side development",
    icon: "Php",
    lessons: [
      "Review PHP syntax and variables",
      "Practice forms and POST requests",
      "Connect a PHP application to MySQL",
    ],
  },
  SQL: {
    label: "SQL and databases",
    description: "Database management",
    icon: "DB",
    lessons: [
      "Practice SELECT, INSERT, UPDATE, and DELETE",
      "Learn WHERE clauses and JOINs",
      "Design and query a relational database",
    ],
  },
  React: {
    label: "React development",
    description: "Frontend development",
    icon: "⚛",
    lessons: [
      "Review React components and JSX",
      "Practice props and useState",
      "Build a reusable interactive component",
    ],
  },
};

const initialRecords = [
  { id: 1, topic: "HTML", score: 58, attempts: 3, completion: 70 },
  { id: 2, topic: "CSS", score: 82, attempts: 1, completion: 100 },
  { id: 3, topic: "JavaScript", score: 68, attempts: 2, completion: 85 },
  { id: 4, topic: "Python", score: 90, attempts: 1, completion: 100 },
  { id: 5, topic: "Java", score: 65, attempts: 3, completion: 75 },
  { id: 6, topic: "C++", score: 78, attempts: 2, completion: 90 },
  { id: 7, topic: "PHP", score: 55, attempts: 4, completion: 60 },
  { id: 8, topic: "SQL", score: 88, attempts: 1, completion: 95 },
  { id: 9, topic: "React", score: 72, attempts: 2, completion: 85 },
];

function getAssessment(record) {
  const score = Number(record.score);
  const completion = Number(record.completion);

  if (score >= 85 && completion >= 90) {
    return {
      status: "Good",
      type: "on-track",
      reason:
        "Strong performance! Your quiz score and activity completion meet the targets.",
      recommendation: [
        `Try an advanced ${record.topic} challenge`,
        `Build a small project using ${record.topic}`,
        "Explore more advanced concepts",
      ],
    };
  }

  if (score >= 70 && completion >= 80) {
    return {
      status: "Satisfactory",
      type: "on-track",
      reason:
        "Good progress! You meet the basic targets. Continue practicing to strengthen your skills.",
      recommendation: [
        `Practice intermediate ${record.topic} exercises`,
        "Complete another topic-related activity",
        "Aim for a quiz score of 85% or higher",
      ],
    };
  }

  let reason;

  if (score < 70) {
    reason = "Your quiz score is below 70%. Review the topic and try again.";
  } else if (completion < 80) {
    reason =
      "Your activity completion is below 80%. Finish the remaining exercises.";
  } else {
    reason = "Continue practicing to improve your results.";
  }

  return {
    status: "Needs practice",
    type: "needs-practice",
    reason,
    recommendation: TOPICS[record.topic].lessons,
  };
}

function Icon({ name, size = 20 }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
        <path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20" />
        <path d="M8 7h8M8 10h8" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5M4 19h17" />
        <path d="m7 15 4-4 3 2 5-7" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
        <path d="m19 15 1 2.5 2 1-2 1L19 22l-1-2.5-2-1 2-1z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [records, setRecords] = useState(initialRecords);
  const [topic, setTopic] = useState("HTML");
  const [score, setScore] = useState("100");
  const [attempts, setAttempts] = useState("1");
  const [completion, setCompletion] = useState(100);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedId, setSelectedId] = useState(1);
  const [notice, setNotice] = useState("");

  const assessments = useMemo(
    () =>
      records.map((record) => ({
        ...record,
        assessment: getAssessment(record),
      })),
    [records]
  );

  const selected = assessments.find((item) => item.id === selectedId);

  const needsPractice = assessments.filter(
    (item) => item.assessment.type === "needs-practice"
  ).length;

  const averageScore = records.length
    ? Math.round(
        records.reduce((sum, item) => sum + item.score, 0) / records.length
      )
    : 0;

  const averageCompletion = records.length
    ? Math.round(
        records.reduce((sum, item) => sum + item.completion, 0) /
          records.length
      )
    : 0;

  function addRecord(event) {
    event.preventDefault();

    const parsedScore = Number(score);
    const parsedAttempts = Number(attempts);

    if (!TOPICS[topic]) {
      setNotice("Please select a valid learning topic.");
      return;
    }

    if (
      score.trim() === "" ||
      !Number.isFinite(parsedScore) ||
      parsedScore < 0 ||
      parsedScore > 100
    ) {
      setNotice("Quiz score must be between 0 and 100.");
      return;
    }

    if (
      attempts.trim() === "" ||
      !Number.isInteger(parsedAttempts) ||
      parsedAttempts < 1
    ) {
      setNotice("Exercise attempts must be a whole number of at least 1.");
      return;
    }

    if (
      !Number.isFinite(completion) ||
      completion < 0 ||
      completion > 100
    ) {
      setNotice("Activity completion must be between 0 and 100.");
      return;
    }

    const record = {
      id: Date.now(),
      topic,
      score: parsedScore,
      attempts: parsedAttempts,
      completion,
    };

    setRecords((current) => [record, ...current]);
    setSelectedId(record.id);
    setActiveNav("Recommendations");
    setNotice("Record added successfully. Your recommendation is ready.");

    document
      .getElementById("recommendation-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseNav(label) {
    setActiveNav(label);
    setNotice("");

    const sectionIds = {
      Dashboard: "overview",
      Performance: "input-panel",
      Recommendations: "recommendation-panel",
      "Learning progress": "progress-panel",
    };

    document
      .getElementById(sectionIds[label])
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectRecord(id) {
    setSelectedId(id);
    setNotice("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#overview"
          onClick={() => {
            setActiveNav("Dashboard");
            setNotice("");
          }}
        >
          <span className="brand-mark">
            <Icon name="spark" size={24} />
          </span>
          <span>
            <strong>LearnWise</strong>
            <small>LEARNING SUPPORT</small>
          </span>
        </a>

        <div className="side-label">WORKSPACE</div>

        <nav className="side-nav" aria-label="Main navigation">
          {[
            ["Dashboard", "grid"],
            ["Performance", "chart"],
            ["Recommendations", "spark"],
            ["Learning progress", "book"],
          ].map(([label, icon]) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${activeNav === label ? "active" : ""}`}
              onClick={() => chooseNav(label)}
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>
              {label === "Recommendations" && needsPractice > 0 && (
                <b className="nav-count">{needsPractice}</b>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <Icon name="book" size={19} />
            </div>
            <strong>Keep learning</strong>
            <p>Small steps today build stronger skills tomorrow.</p>
            <button
              type="button"
              onClick={() => chooseNav("Learning progress")}
            >
              View progress <Icon name="arrow" size={15} />
            </button>
          </div>

          <div className="profile">
            <div className="avatar">ST</div>
            <div className="profile-text">
              <strong>Student Demo</strong>
              <span>Learning account</span>
            </div>
            <span className="profile-dot" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activeNav}</strong>
          </div>
          <div className="topbar-right">
            <span className="demo-pill">
              <span /> DEMO MODE
            </span>
            <div className="top-avatar">ST</div>
          </div>
        </header>

        <section className="welcome-row" id="overview">
          <div>
            <p className="eyebrow">YOUR PERSONAL LEARNING SPACE</p>
            <h1>
              Learn at your own pace<span>.</span>
            </h1>
            <p className="welcome-copy">
              Review your performance, discover topics to practice, and keep
              moving forward.
            </p>
          </div>

          <div className="welcome-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-book">
              <Icon name="book" size={36} />
            </div>
            <div className="art-spark spark-one">✦</div>
            <div className="art-spark spark-two">✧</div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Performance summary">
          <article className="stat-card">
            <div className="stat-top">
              <span>Average quiz score</span>
              <span className="stat-icon purple">
                <Icon name="chart" />
              </span>
            </div>
            <div className="stat-value">
              {averageScore}<small>%</small>
            </div>
            <div className="stat-foot">
              <span className="mini-line" />
              Across {records.length} topic records
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Activity completion</span>
              <span className="stat-icon green">
                <Icon name="check" />
              </span>
            </div>
            <div className="stat-value">
              {averageCompletion}<small>%</small>
            </div>
            <div className="stat-progress">
              <span style={{ width: `${averageCompletion}%` }} />
            </div>
            <div className="stat-foot">Average completion rate</div>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Topics to practice</span>
              <span className="stat-icon orange">
                <Icon name="book" />
              </span>
            </div>
            <div className="stat-value">
              {needsPractice}<small> records</small>
            </div>
            <div className="stat-foot">
              <span className="status-dot orange-dot" />
              Based on performance criteria
            </div>
          </article>
        </section>

        <div className="content-grid">
          <section className="panel input-panel" id="input-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PERFORMANCE DATA</p>
                <h2>Add a learning record</h2>
                <p className="panel-subtitle">
                  Enter a student's topic performance to see an assessment.
                </p>
              </div>
              <span className="heading-icon">
                <Icon name="plus" />
              </span>
            </div>

            <form className="performance-form" onSubmit={addRecord}>
              <label>
                Learning topic
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  {Object.entries(TOPICS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-two">
                <label>
                  Quiz score (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Exercise attempts
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={attempts}
                    onChange={(event) => setAttempts(event.target.value)}
                    required
                  />
                </label>
              </div>

              <label>
                Activity completion{" "}
                <span className="label-value">{completion}%</span>
                <input
                  className="range-input"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={completion}
                  onChange={(event) =>
                    setCompletion(Number(event.target.value))
                  }
                />
                <span className="range-ends">
                  <span>0% complete</span>
                  <span>100% complete</span>
                </span>
              </label>

              <button className="primary-button" type="submit">
                Analyze performance <Icon name="arrow" size={18} />
              </button>

              <p className="form-note">
                Demonstration criteria, not a trained AI model.
              </p>
            </form>

            {notice && (
              <div className="notice" role="status">
                {notice}
              </div>
            )}
          </section>

          <section
            className="panel recommendation-panel"
            id="recommendation-panel"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PERSONALIZED SUPPORT</p>
                <h2>Learning recommendation</h2>
                <p className="panel-subtitle">
                  Select a record below to inspect its result.
                </p>
              </div>
              <span className="heading-icon">
                <Icon name="spark" />
              </span>
            </div>

            {selected ? (
              <>
                <div
                  className={`assessment-banner ${selected.assessment.type}`}
                >
                  <span className="assessment-symbol">
                    {selected.assessment.type === "needs-practice" ? "↗" : "✓"}
                  </span>
                  <div>
                    <strong>
                      {selected.topic}: {selected.assessment.status}
                    </strong>
                    <p>{selected.assessment.reason}</p>
                  </div>
                </div>

                <div className="recommendation-title">
                  Suggested next steps
                </div>

                <ol className="lesson-list">
                  {selected.assessment.recommendation.map((lesson, index) => (
                    <li key={lesson}>
                      <span className="lesson-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{lesson}</span>
                      <Icon name="arrow" size={16} />
                    </li>
                  ))}
                </ol>

                <div className="teacher-note">
                  <span className="note-icon">i</span>
                  <p>
                    <strong>Support, not a final judgment.</strong> These
                    results are based on the recorded score and completion.
                    A teacher should consider other factors too.
                  </p>
                </div>
              </>
            ) : (
              <p className="empty-state">
                Add a record to see a recommendation.
              </p>
            )}
          </section>
        </div>

        <section className="panel progress-panel" id="progress-panel">
          <div className="panel-heading progress-heading">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2>Topic performance</h2>
              <p className="panel-subtitle">
                Choose a record to view its recommendation.
              </p>
            </div>
            <span className="record-count">{records.length} records</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>TOPIC</th>
                  <th>QUIZ SCORE</th>
                  <th>ATTEMPTS</th>
                  <th>COMPLETION</th>
                  <th>ASSESSMENT</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {assessments.map((item) => {
                  const details = TOPICS[item.topic];

                  return (
                    <tr
                      key={item.id}
                      className={selectedId === item.id ? "selected-row" : ""}
                      onClick={() => selectRecord(item.id)}
                    >
                      <td>
                        <div className="topic-cell">
                          <span
                            className={`topic-icon ${item.topic
                              .toLowerCase()
                              .replace("++", "pp")}`}
                          >
                            {details.icon}
                          </span>
                          <span>
                            <strong>{item.topic}</strong>
                            <small>{details.description}</small>
                          </span>
                        </div>
                      </td>

                      <td>
                        <strong>{item.score}%</strong>
                        <div className="table-bar">
                          <span style={{ width: `${item.score}%` }} />
                        </div>
                      </td>

                      <td>
                        {item.attempts}{" "}
                        <span className="muted">
                          attempt{item.attempts === 1 ? "" : "s"}
                        </span>
                      </td>

                      <td>{item.completion}%</td>

                      <td>
                        <span
                          className={`status-badge ${item.assessment.type}`}
                        >
                          {item.assessment.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-button"
                          type="button"
                          aria-label={`View ${item.topic} recommendation`}
                          onClick={(event) => {
                            event.stopPropagation();
                            selectRecord(item.id);
                            document
                              .getElementById("recommendation-panel")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                        >
                          <Icon name="arrow" size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="table-hint">
            Tip: Select any row to update the recommendation panel.
          </p>
        </section>

        <footer className="footer">
          <span>LearnWise · Student Learning Support Prototype</span>
          <span>Sample data · For demonstration only</span>
        </footer>
      </main>
    </div>
  );
}

export default App