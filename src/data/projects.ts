import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'intelligent-assistant',
    title: 'Интеллектуальный Ассистент Инженера',
    shortTitle: 'Ассистент Инженера',
    description: 'Интеллектуальная система для автоматизации рутинных задач инженеров с RAG и LLM',
    cover: '/projects/intelligent-assistant/cover.jpg',
    images: [
      '/projects/intelligent-assistant/1.jpg',
      '/projects/intelligent-assistant/2.jpg',
      '/projects/intelligent-assistant/3.jpg',
      '/projects/intelligent-assistant/4.jpg',
    ],
    contentPath: '/projects/intelligent-assistant/content.md',
    stack: [
      'Python 3.12',
      'FastAPI',
      'PostgreSQL',
      'Qdrant',
      'DeepSeek V4 Flash',
      'Docker',
      'Jinja2',
      'Bootstrap 5',
      'Plotly',
    ],
    links: [],
    result:
      'Сокращение времени на рутинные задачи с 2-3 часов до 15 минут. 100% покрытие инцидентов в базе знаний. Оптимальная загрузка оборудования.',
  },
  {
    id: 'telegram-ai-content',
    title: 'Автоматизация Telegram-канала с ИИ-генерацией контента',
    shortTitle: 'Telegram AI Content',
    description: 'Полностью автономный Telegram-канал с ежедневным ИИ-контентом',
    cover: '/projects/telegram-ai-content/cover.jpg',
    images: [
      '/projects/telegram-ai-content/1.jpg',
    ],
    contentPath: '/projects/telegram-ai-content/content.md',
    stack: [
      'Python',
      'Telegram Bot API',
      'ИИ-генерация контента',
      'SMM-автоматизация',
    ],
    links: [
      { label: 'Telegram', url: 'https://t.me/im_smm_bitch' },
    ],
    result:
      'С 0 до 500+ подписчиков за 2 месяца. 5 постов в день вместо 1-2. Полная автоматизация: контент генерируется и публикуется без участия человека.',
  },
]