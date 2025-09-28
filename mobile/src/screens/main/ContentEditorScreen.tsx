import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Chip,
  ActivityIndicator,
  Appbar,
  Menu,
  Divider,
} from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../../styles/theme';
import { RootState, AppDispatch } from '../../store';
import { generateContent, improveContent, saveContent } from '../../store/slices/contentSlice';

interface RouteParams {
  contentId?: string;
  type?: 'blog' | 'social' | 'email' | 'ad' | 'product-description';
  initialPrompt?: string;
}

const ContentEditorScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { contentId, type = 'blog', initialPrompt = '' } = (route.params as RouteParams) || {};

  const { isGenerating, currentContent, error } = useSelector((state: RootState) => state.content);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [tone, setTone] = useState<'professional' | 'casual' | 'friendly' | 'authoritative' | 'humorous'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [toneMenuVisible, setToneMenuVisible] = useState(false);
  const [lengthMenuVisible, setLengthMenuVisible] = useState(false);

  useEffect(() => {
    if (currentContent) {
      setTitle(currentContent.title || '');
      setContent(currentContent.content || '');
    }
  }, [currentContent]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt for content generation');
      return;
    }

    try {
      await dispatch(generateContent({
        type,
        prompt,
        tone,
        length,
        keywords,
        targetAudience: targetAudience || undefined,
      })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to generate content. Please try again.');
    }
  };

  const handleImprove = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'No content to improve');
      return;
    }

    const instructions = await new Promise<string>((resolve) => {
      Alert.prompt(
        'Improve Content',
        'How would you like to improve this content?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve('') },
          { text: 'Improve', onPress: (text) => resolve(text || 'Make it more engaging') },
        ]
      );
    });

    if (instructions) {
      try {
        await dispatch(improveContent({ content, instructions })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to improve content. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please enter both title and content');
      return;
    }

    try {
      await dispatch(saveContent({
        id: contentId,
        title,
        content,
        type,
        keywords,
        targetAudience,
        meta: currentContent?.meta,
      })).unwrap();

      Alert.alert('Success', 'Content saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save content. Please try again.');
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Content Editor" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item onPress={handleImprove} title="Improve Content" />
          <Menu.Item onPress={() => {/* Handle export */}} title="Export" />
          <Divider />
          <Menu.Item onPress={() => {/* Handle settings */}} title="Settings" />
        </Menu>
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Generation Controls */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Content Generation</Text>

              <TextInput
                style={styles.promptInput}
                placeholder="Enter your content prompt..."
                value={prompt}
                onChangeText={setPrompt}
                multiline
                numberOfLines={3}
              />

              <View style={styles.controlsRow}>
                <View style={styles.controlItem}>
                  <Text style={styles.controlLabel}>Tone</Text>
                  <Menu
                    visible={toneMenuVisible}
                    onDismiss={() => setToneMenuVisible(false)}
                    anchor={
                      <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setToneMenuVisible(true)}
                      >
                        <Text style={styles.menuButtonText}>{tone}</Text>
                        <Icon name="arrow-drop-down" size={20} />
                      </TouchableOpacity>
                    }
                  >
                    {['professional', 'casual', 'friendly', 'authoritative', 'humorous'].map(option => (
                      <Menu.Item
                        key={option}
                        onPress={() => {
                          setTone(option as any);
                          setToneMenuVisible(false);
                        }}
                        title={option}
                      />
                    ))}
                  </Menu>
                </View>

                <View style={styles.controlItem}>
                  <Text style={styles.controlLabel}>Length</Text>
                  <Menu
                    visible={lengthMenuVisible}
                    onDismiss={() => setLengthMenuVisible(false)}
                    anchor={
                      <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setLengthMenuVisible(true)}
                      >
                        <Text style={styles.menuButtonText}>{length}</Text>
                        <Icon name="arrow-drop-down" size={20} />
                      </TouchableOpacity>
                    }
                  >
                    {['short', 'medium', 'long'].map(option => (
                      <Menu.Item
                        key={option}
                        onPress={() => {
                          setLength(option as any);
                          setLengthMenuVisible(false);
                        }}
                        title={option}
                      />
                    ))}
                  </Menu>
                </View>
              </View>

              <View style={styles.keywordsSection}>
                <Text style={styles.controlLabel}>Keywords</Text>
                <View style={styles.keywordInputRow}>
                  <TextInput
                    style={styles.keywordInput}
                    placeholder="Add keyword"
                    value={keywordInput}
                    onChangeText={setKeywordInput}
                    onSubmitEditing={addKeyword}
                  />
                  <TouchableOpacity onPress={addKeyword} style={styles.addButton}>
                    <Icon name="add" size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.keywordsContainer}>
                  {keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      style={styles.keyword}
                      onClose={() => removeKeyword(keyword)}
                    >
                      {keyword}
                    </Chip>
                  ))}
                </View>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Target audience (optional)"
                value={targetAudience}
                onChangeText={setTargetAudience}
              />

              <Button
                mode="contained"
                onPress={handleGenerate}
                loading={isGenerating}
                disabled={isGenerating || !prompt.trim()}
                style={styles.generateButton}
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>
            </Card.Content>
          </Card>

          {/* Content Editor */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Content</Text>

              <TextInput
                style={styles.titleInput}
                placeholder="Enter title..."
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.contentInput}
                placeholder="Enter your content here..."
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={15}
                textAlignVertical="top"
              />

              {currentContent?.meta && (
                <View style={styles.metaInfo}>
                  <Text style={styles.metaText}>
                    Words: {currentContent.meta.wordCount} |
                    Reading time: {currentContent.meta.readingTime} min
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>

          {error && (
            <Card style={[styles.card, styles.errorCard]}>
              <Card.Content>
                <Text style={styles.errorText}>{error}</Text>
              </Card.Content>
            </Card>
          )}
        </ScrollView>

        <View style={styles.bottomActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={!title.trim() || !content.trim()}
            style={styles.saveButton}
          >
            Save Content
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  promptInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: theme.colors.text.primary,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.surface,
  },
  menuButtonText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    textTransform: 'capitalize',
  },
  keywordsSection: {
    marginBottom: 16,
  },
  keywordInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  keywordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyword: {
    margin: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  generateButton: {
    marginTop: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 300,
    fontSize: 16,
    lineHeight: 24,
  },
  metaInfo: {
    padding: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 4,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  errorCard: {
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});

export default ContentEditorScreen;