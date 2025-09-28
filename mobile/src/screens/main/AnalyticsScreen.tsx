import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  Appbar,
  Menu,
  Divider,
} from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../../styles/theme';
import { RootState, AppDispatch } from '../../store';
import { fetchAnalytics } from '../../store/slices/analyticsSlice';

const { width } = Dimensions.get('window');

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const AnalyticsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analytics, isLoading, error } = useSelector((state: RootState) => state.analytics);

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      await dispatch(fetchAnalytics({ timeRange })).unwrap();
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const metricCards: MetricCard[] = [
    {
      title: 'Total Content',
      value: analytics?.overview?.totalContent?.toString() || '0',
      change: analytics?.overview?.contentGrowth || 0,
      icon: 'article',
      color: theme.colors.primary,
    },
    {
      title: 'AI Generations',
      value: analytics?.overview?.aiGenerations?.toString() || '0',
      change: analytics?.overview?.generationsGrowth || 0,
      icon: 'auto-fix-high',
      color: '#4CAF50',
    },
    {
      title: 'Avg Engagement',
      value: `${analytics?.overview?.avgEngagement || 0}%`,
      change: analytics?.overview?.engagementGrowth || 0,
      icon: 'trending-up',
      color: '#FF9800',
    },
    {
      title: 'Content Score',
      value: `${analytics?.overview?.contentScore || 0}/100`,
      change: analytics?.overview?.scoreGrowth || 0,
      icon: 'star',
      color: '#9C27B0',
    },
  ];

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.text.primary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  const contentPerformanceData = {
    labels: analytics?.contentPerformance?.labels || [],
    datasets: [
      {
        data: analytics?.contentPerformance?.data || [],
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const contentTypesData = {
    labels: analytics?.contentTypes?.labels || [],
    datasets: [
      {
        data: analytics?.contentTypes?.data || [],
      },
    ],
  };

  const engagementData = analytics?.topContent?.map((item, index) => ({
    name: item.title?.substring(0, 20) + '...' || `Content ${index + 1}`,
    engagement: item.engagement || 0,
    color: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'][index % 5],
    legendFontColor: theme.colors.text.primary,
    legendFontSize: 12,
  })) || [];

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Analytics" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="calendar-range"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setTimeRange('7d');
              setMenuVisible(false);
            }}
            title="Last 7 days"
            leadingIcon={timeRange === '7d' ? 'check' : undefined}
          />
          <Menu.Item
            onPress={() => {
              setTimeRange('30d');
              setMenuVisible(false);
            }}
            title="Last 30 days"
            leadingIcon={timeRange === '30d' ? 'check' : undefined}
          />
          <Menu.Item
            onPress={() => {
              setTimeRange('90d');
              setMenuVisible(false);
            }}
            title="Last 90 days"
            leadingIcon={timeRange === '90d' ? 'check' : undefined}
          />
          <Menu.Item
            onPress={() => {
              setTimeRange('1y');
              setMenuVisible(false);
            }}
            title="Last year"
            leadingIcon={timeRange === '1y' ? 'check' : undefined}
          />
        </Menu>
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Metric Cards */}
        <View style={styles.metricsGrid}>
          {metricCards.map((metric, index) => (
            <Card key={index} style={styles.metricCard}>
              <Card.Content style={styles.metricContent}>
                <View style={styles.metricHeader}>
                  <Icon
                    name={metric.icon}
                    size={24}
                    color={metric.color}
                  />
                  <View style={styles.metricChange}>
                    <Icon
                      name={metric.change >= 0 ? 'trending-up' : 'trending-down'}
                      size={16}
                      color={metric.change >= 0 ? '#4CAF50' : '#F44336'}
                    />
                    <Text style={[
                      styles.changeText,
                      { color: metric.change >= 0 ? '#4CAF50' : '#F44336' }
                    ]}>
                      {Math.abs(metric.change)}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Content Performance Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Content Performance</Text>
            <Text style={styles.chartSubtitle}>Views and engagement over time</Text>
            {contentPerformanceData.labels.length > 0 ? (
              <LineChart
                data={contentPerformanceData}
                width={width - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Content Types Distribution */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Content Types</Text>
            <Text style={styles.chartSubtitle}>Distribution by content type</Text>
            {contentTypesData.labels.length > 0 ? (
              <BarChart
                data={contentTypesData}
                width={width - 64}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                showValuesOnTopOfBars
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Top Performing Content */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Top Performing Content</Text>
            <Text style={styles.chartSubtitle}>Engagement by content piece</Text>
            {engagementData.length > 0 ? (
              <PieChart
                data={engagementData}
                width={width - 64}
                height={220}
                chartConfig={chartConfig}
                accessor="engagement"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 0]}
                style={styles.chart}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* AI Usage Stats */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>AI Usage Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {analytics?.aiUsage?.totalGenerations || 0}
                </Text>
                <Text style={styles.statLabel}>Total Generations</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {analytics?.aiUsage?.averageTime || 0}s
                </Text>
                <Text style={styles.statLabel}>Avg Generation Time</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {analytics?.aiUsage?.successRate || 0}%
                </Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {analytics?.aiUsage?.favoriteType || 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Favorite Type</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recommendations */}
        {analytics?.recommendations && analytics.recommendations.length > 0 && (
          <Card style={styles.chartCard}>
            <Card.Content>
              <Text style={styles.chartTitle}>Recommendations</Text>
              <Text style={styles.chartSubtitle}>AI-powered insights to improve your content</Text>
              {analytics.recommendations.map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Icon
                    name="lightbulb-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.recommendationText}>
                    {recommendation}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    marginBottom: 8,
  },
  metricContent: {
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  chartCard: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.primary,
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default AnalyticsScreen;