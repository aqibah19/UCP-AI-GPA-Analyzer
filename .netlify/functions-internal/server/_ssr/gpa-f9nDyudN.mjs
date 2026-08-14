//#region node_modules/.nitro/vite/services/ssr/assets/gpa-f9nDyudN.js
var GRADE_SCALE = [
	{
		grade: "A",
		min: 85,
		max: 100,
		point: 4
	},
	{
		grade: "A-",
		min: 80,
		max: 84.99,
		point: 3.7
	},
	{
		grade: "B+",
		min: 75,
		max: 79.99,
		point: 3.3
	},
	{
		grade: "B",
		min: 71,
		max: 74.99,
		point: 3
	},
	{
		grade: "B-",
		min: 68,
		max: 70.99,
		point: 2.7
	},
	{
		grade: "C+",
		min: 64,
		max: 67.99,
		point: 2.3
	},
	{
		grade: "C",
		min: 61,
		max: 63.99,
		point: 2
	},
	{
		grade: "C-",
		min: 58,
		max: 60.99,
		point: 1.7
	},
	{
		grade: "D+",
		min: 54,
		max: 57.99,
		point: 1.3
	},
	{
		grade: "D",
		min: 50,
		max: 53.99,
		point: 1
	},
	{
		grade: "F",
		min: 0,
		max: 49.99,
		point: 0
	}
];
function gradeFor(percentage) {
	const p = Math.max(0, Math.min(100, percentage));
	return GRADE_SCALE.find((g) => p >= g.min) ?? {
		grade: "F",
		min: 0,
		max: 49.99,
		point: 0
	};
}
function ruleCount(rule) {
	if (rule.startsWith("top")) return Number(rule.replace("top", ""));
	return null;
}
function pct(item) {
	if (!item.total || item.total <= 0) return 0;
	return item.obtained / item.total * 100;
}
function computeCategory(category) {
	const items = category.items.filter((i) => Number.isFinite(i.obtained) && Number.isFinite(i.total));
	const n = ruleCount(category.rule);
	let used = items;
	let dropped = [];
	if (n && items.length > n) {
		const sorted = [...items].sort((a, b) => pct(b) - pct(a));
		used = sorted.slice(0, n);
		dropped = sorted.slice(n);
	}
	let scorePercent = 0;
	if (used.length > 0) {
		if (category.rule === "all") {
			const obtained = used.reduce((s, i) => s + i.obtained, 0);
			const total = used.reduce((s, i) => s + i.total, 0);
			scorePercent = total > 0 ? obtained / total * 100 : 0;
		} else scorePercent = used.reduce((s, i) => s + pct(i), 0) / used.length;
	}
	scorePercent = Math.max(0, Math.min(100, scorePercent));
	return {
		name: category.name,
		weightPercent: category.weightPercent,
		rule: category.rule,
		usedItems: used,
		droppedItems: dropped,
		scorePercent,
		weightedScore: scorePercent * category.weightPercent / 100
	};
}
function computeGpa(data) {
	const categories = data.categories.map(computeCategory);
	const totalWeight = categories.reduce((s, c) => s + c.weightPercent, 0);
	const weighted = categories.reduce((s, c) => s + c.weightedScore, 0);
	const percentage = totalWeight > 0 ? weighted / totalWeight * 100 : 0;
	const g = gradeFor(percentage);
	return {
		percentage,
		grade: g.grade,
		gradePoint: g.point,
		totalWeight,
		categories
	};
}
/** What-if analysis on the remaining (un-entered) weight of the course. */
function scenarioAnalysis(data) {
	const result = computeGpa(data);
	const earned = result.categories.reduce((s, c) => s + c.weightedScore, 0);
	const remaining = Math.max(0, 100 - result.totalWeight);
	const rows = [];
	const options = [
		{
			label: "Remaining assessments at 100%",
			perf: 100
		},
		{
			label: "Remaining assessments at 90%",
			perf: 90
		},
		{
			label: "Remaining assessments at 80%",
			perf: 80
		},
		{
			label: "Remaining assessments at 70%",
			perf: 70
		},
		{
			label: "Remaining assessments at 50%",
			perf: 50
		}
	];
	if (remaining <= .5) {
		const g = gradeFor(result.percentage);
		return [{
			label: "Full evaluation covered — final standing",
			percentage: result.percentage,
			grade: g.grade,
			gradePoint: g.point
		}];
	}
	for (const o of options) {
		const total = earned + remaining * o.perf / 100;
		const g = gradeFor(total);
		rows.push({
			label: o.label,
			percentage: total,
			grade: g.grade,
			gradePoint: g.point
		});
	}
	return rows;
}
function round(n, d = 2) {
	return Math.round(n * 10 ** d) / 10 ** d;
}
//#endregion
export { scenarioAnalysis as a, round as i, computeGpa as n, gradeFor as r, GRADE_SCALE as t };
