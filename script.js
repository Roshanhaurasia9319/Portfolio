
// Scroll Animation for Sections
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('show');
        }
    });
});

    async function fetchLeetCodeData() {
        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/Roshan2002`);
            const data = await response.json();

            if (data && data.easySolved != null && data.mediumSolved != null && data.hardSolved != null) {
                document.getElementById('leetcode-easy').textContent = data.easySolved;
                document.getElementById('leetcode-medium').textContent = data.mediumSolved;
                document.getElementById('leetcode-hard').textContent = data.hardSolved;
                
                createChart('leetcodeChart', [data.easySolved, data.mediumSolved, data.hardSolved], ['Easy', 'Medium', 'Hard']);
            } else {
                console.error('Data structure unexpected or empty');
            }
        } catch (error) {
            console.error('Error fetching LeetCode data:', error);
        }
    }

    async function fetchCodeChefData() {
        try {
            const response = await fetch(`https://codechef-api.vercel.app/handle/roshan9319`);
            const data = await response.json();

            if (data && data.ratingData) {
                document.getElementById('codechef-rating').textContent = data.currentRating;
                document.getElementById('codechef-global-rank').textContent = data.globalRank;

                // Prepare data for pie chart
                const ratings = {};
                data.ratingData.forEach(item => {
                    if (ratings[item.rating]) {
                        ratings[item.rating]++;
                    } else {
                        ratings[item.rating] = 1;
                    }
                });

                const chartData = Object.values(ratings);
                const chartLabels = Object.keys(ratings);

                // Create a pie chart
                createChart('codechefChart', chartData, chartLabels);
            } else {
                console.error('Data structure unexpected or empty');
            }
        } catch (error) {
            console.error('Error fetching CodeChef data:', error);
        }
    }

    function createChart(elementId, data, labels) {
        const ctx = document.getElementById(elementId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels.length > 0 ? labels : ['No Data'],
                datasets: [{
                    data: data.length > 0 ? data : [1], // Ensure at least one segment in case of no data
                    backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196F3', '#9C27B0'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }

    fetchLeetCodeData();
    fetchCodeChefData();

