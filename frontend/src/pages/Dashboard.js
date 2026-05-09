import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API } from "../context/AuthContext";
import { SEMESTER_LABELS, getGPColor } from "../utils/grades";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/semesters")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <div className="loading-screen">
                <div className="loader" />
            </div>
        );

    const sems = data?.semesters || [];
    const chartData = sems.map((s) => ({
        name: s.semesterName,
        SGPA: s.sgpa,
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "10px 14px",
                    }}
                >
                    <p style={{ fontSize: 13, marginBottom: 4 }}>{label}</p>
                    <p style={{ fontWeight: 700, color: "#6366f1" }}>
                        SGPA: {payload[0]?.value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
                <p>Here's your academic performance overview</p>
            </div>

            {/* Stats Grid - Now 2 columns on mobile */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-label">CGPA</div>
                    <div className="stat-value" style={{ color: "#6366f1" }}>
                        {data?.cgpa || "—"}
                    </div>
                    <div className="stat-sub">
                        {data?.cgpaPercentage
                            ? `${data.cgpaPercentage}%`
                            : "No data yet"}
                    </div>
                </div>

                <div className="stat-card teal">
                    <div className="stat-label">Semesters</div>
                    <div
                        className="stat-value"
                        style={{ color: "var(--secondary)" }}
                    >
                        {sems.length}
                        <span style={{ fontSize: 16 }}>/8</span>
                    </div>
                    <div className="stat-sub">Completed</div>
                </div>

                <div className="stat-card green">
                    <div className="stat-label">Total Credits</div>
                    <div
                        className="stat-value"
                        style={{ color: "var(--success)" }}
                    >
                        {data?.totalCredits || 0}
                    </div>
                    <div className="stat-sub">Registered credits</div>
                </div>

                <div className="stat-card red">
                    <div className="stat-label">Backlogs</div>
                    <div
                        className="stat-value"
                        style={{
                            color:
                                data?.totalBacklogs > 0
                                    ? "var(--danger)"
                                    : "var(--success)",
                        }}
                    >
                        {data?.totalBacklogs || 0}
                    </div>
                    <div className="stat-sub">
                        {data?.totalBacklogs === 0
                            ? "Clean record ✓"
                            : "Need attention"}
                    </div>
                </div>
            </div>

            {/* Class Awarded */}
            {data?.classAwarded && (
                <div className="class-awarded-card">
                    <h3>Class Awarded</h3>
                    <div className="class-name">{data.classAwarded}</div>
                    {data.totalBacklogs === 0 && (
                        <p
                            style={{
                                fontSize: 12,
                                color: "var(--text-muted)",
                                marginTop: 6,
                            }}
                        >
                            Only without any supplementary appearance
                        </p>
                    )}
                </div>
            )}

            {/* Chart or Empty State */}
            {sems.length > 0 ? (
                <div className="card dashboard-trend-card">
                    <h3>SGPA Trend</h3>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--text-muted)",
                            marginBottom: 16,
                        }}
                    >
                        Your performance across semesters
                    </p>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} barCategoryGap="20%">
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{
                                        fill: "var(--text-muted)",
                                        fontSize: 10,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={[0, 10]}
                                    tick={{
                                        fill: "var(--text-muted)",
                                        fontSize: 12,
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                                />
                                <Bar
                                    dataKey="SGPA"
                                    fill="#4f46e5"
                                    maxBarSize={26}
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : (
                <div className="card dashboard-empty-card">
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                    <h3>No semesters added yet</h3>
                    <p
                        style={{
                            color: "var(--text-muted)",
                            margin: "12px 0 24px",
                            lineHeight: 1.4,
                        }}
                    >
                        Start by adding your semester grades in the Calculator
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/calculator")}
                    >
                        Add First Semester
                    </button>
                </div>
            )}

            {/* Semester Summary */}
            {sems.length > 0 && (
                <div className="card dashboard-summary-card">
                    <h3 style={{ marginBottom: 16 }}>Semester Summary</h3>
                    <div className="sem-list">
                        {sems.map((sem) => (
                            <div
                                key={sem.semesterName}
                                className="sem-row"
                                onClick={() => navigate("/sgpa")}
                            >
                                <div>
                                    <div className="sem-row-label">
                                        {sem.semesterName} Sem
                                    </div>
                                    <div className="sem-row-sub">
                                        {SEMESTER_LABELS[sem.semesterName]}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className="sem-row-val"
                                        style={{ color: getGPColor(sem.sgpa) }}
                                    >
                                        {sem.sgpa}
                                    </div>
                                    <div className="sem-row-mini">SGPA</div>
                                </div>

                                <div>
                                    <div
                                        className="sem-row-val"
                                        style={{ fontSize: 16 }}
                                    >
                                        {sem.percentage}%
                                    </div>
                                    <div className="sem-row-mini">
                                        Percentage
                                    </div>
                                </div>

                                <div>
                                    {sem.totalBacklogs > 0 ? (
                                        <span className="backlog-badge">
                                            ⚠ {sem.totalBacklogs} backlog
                                            {sem.totalBacklogs > 1 ? "s" : ""}
                                        </span>
                                    ) : (
                                        <span className="no-backlog-badge">
                                            ✓ Clear
                                        </span>
                                    )}
                                </div>

                                <div
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: 18,
                                    }}
                                >
                                    ›
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
