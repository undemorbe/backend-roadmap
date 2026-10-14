// Контент роадмапа. Редактируй здесь, затем node scripts/gen-docs.js
// Факты сверены с релиз-нотами Go 1.25–1.27, PostgreSQL 18, Kafka 4.x, Redis 8 (октябрь 2026).
window.ROADMAP = window.ROADMAP || {};
window.ROADMAP.lines = {
  "base": {
    "name": "Фундамент",
    "color": "#7A8597"
  },
  "go": {
    "name": "Go",
    "color": "#0098B8"
  },
  "quality": {
    "name": "Качество",
    "color": "#2E9E5B"
  },
  "web": {
    "name": "Протоколы и API",
    "color": "#E8840C"
  },
  "data": {
    "name": "Данные",
    "color": "#D33A3A"
  },
  "infra": {
    "name": "Инфраструктура",
    "color": "#1F6FD1"
  },
  "arch": {
    "name": "Архитектура",
    "color": "#C2185B"
  },
  "msg": {
    "name": "Сообщения",
    "color": "#7B4FC9"
  }
};

window.ROADMAP.modules = [
  {
    "id": "foundation",
    "line": "base",
    "title": "Linux, Git и сети",
    "short": "Linux и сети",
    "weeks": 2,
    "goal": "Уверенно жить в терминале, понимать, что происходит с запросом от клавиатуры до сервера, и работать с Git как в команде.",
    "topics": [
      {
        "h": "Linux и терминал",
        "items": [
          "Файловая система, права (<code>chmod</code>, <code>chown</code>, 750 и 644), пользователи и группы",
          "Процессы: <code>ps</code>, <code>top</code>/<code>htop</code>, сигналы SIGTERM, SIGINT, SIGKILL, коды возврата",
          "Пайпы и перенаправления, <code>grep</code>, <code>sed</code>, <code>awk</code>, <code>jq</code>, <code>xargs</code>",
          "Переменные окружения, <code>ssh</code> и ключи, <code>systemd</code> на уровне обзора"
        ]
      },
      {
        "h": "Git",
        "items": [
          "Ветки, merge против rebase, interactive rebase, cherry-pick, reflog",
          "Pull request flow, code review, conventional commits",
          "<code>git bisect</code> для поиска коммита с багом"
        ]
      },
      {
        "h": "Сети",
        "items": [
          "Модель TCP/IP, IP-адреса, порты, NAT",
          "TCP: рукопожатие, контроль потока, повторная передача. UDP и где он лучше",
          "DNS: записи A, AAAA, CNAME, MX, NS, TTL",
          "TLS-рукопожатие на пальцах, сертификаты и цепочка доверия",
          "Инструменты: <code>curl -v</code>, <code>dig</code>, <code>ss</code>, <code>tcpdump</code>, Wireshark",
          "Классика собеседований: что происходит, когда вводишь URL в браузер"
        ]
      }
    ],
    "practice": [
      "Bash-скрипт: архивирует папку в tar.gz с датой в имени и удаляет архивы старше 7 дней. Повесь на cron.",
      "Выполни <code>curl -v https://go.dev</code> и письменно разбери каждую строку вывода: DNS, TCP, TLS, заголовки.",
      "Через <code>dig</code> найди A, MX и NS записи трёх доменов, объясни, зачем у них разный TTL.",
      "В тестовом репозитории «потеряй» коммит через reset --hard и восстанови его через reflog.",
      "Найди коммит, сломавший тест, через <code>git bisect run</code>."
    ],
    "resources": [
      {
        "t": "The Missing Semester (MIT)",
        "u": "https://missing.csail.mit.edu/"
      },
      {
        "t": "Pro Git (на русском)",
        "u": "https://git-scm.com/book/ru/v2"
      },
      {
        "t": "Learn Git Branching — интерактивный тренажёр",
        "u": "https://learngitbranching.js.org/?locale=ru_RU"
      },
      {
        "t": "High Performance Browser Networking",
        "u": "https://hpbn.co/"
      }
    ],
    "quiz": [
      {
        "q": "Какой сигнал процесс не может перехватить или проигнорировать?",
        "o": [
          "SIGTERM",
          "SIGINT",
          "SIGKILL",
          "SIGHUP"
        ],
        "a": 2,
        "why": "SIGKILL обрабатывается ядром напрямую. Поэтому graceful shutdown строят на SIGTERM, а SIGKILL — крайняя мера."
      },
      {
        "q": "Из каких шагов состоит TCP-рукопожатие?",
        "o": [
          "SYN, ACK",
          "SYN, SYN-ACK, ACK",
          "HELLO, ACK, FIN",
          "SYN, FIN, ACK"
        ],
        "a": 1,
        "why": "Три шага: клиент шлёт SYN, сервер отвечает SYN-ACK, клиент подтверждает ACK."
      },
      {
        "q": "Что делает git rebase main, находясь в feature-ветке?",
        "o": [
          "Создаёт merge-коммит",
          "Переносит коммиты ветки поверх main, переписывая их хэши",
          "Удаляет ветку main",
          "Отправляет ветку на сервер"
        ],
        "a": 1,
        "why": "Rebase пересоздаёт коммиты поверх новой базы. Поэтому не делай rebase опубликованных общих веток."
      },
      {
        "q": "Права 750 на файл означают:",
        "o": [
          "Все могут читать",
          "Владелец rwx, группа r-x, остальные ничего",
          "Владелец r-x, группа rwx",
          "Только чтение для всех"
        ],
        "a": 1,
        "why": "7 = rwx, 5 = r-x, 0 = ---. Порядок: владелец, группа, остальные."
      },
      {
        "q": "Что возвращает DNS-запись CNAME?",
        "o": [
          "IPv4-адрес",
          "Почтовый сервер",
          "Другое доменное имя (псевдоним)",
          "Открытый ключ домена"
        ],
        "a": 2,
        "why": "CNAME указывает на каноническое имя, которое резолвится дальше."
      },
      {
        "q": "Где UDP обычно предпочтительнее TCP?",
        "o": [
          "Загрузка файлов",
          "REST API",
          "Голосовые звонки и игры в реальном времени",
          "Подключение к PostgreSQL"
        ],
        "a": 2,
        "why": "Когда задержка важнее доставки каждого пакета, повторные отправки TCP только мешают. На UDP построен и QUIC (HTTP/3)."
      }
    ],
    "videos": [
      {
        "t": "The Missing Semester (MIT): терминал, git, скрипты",
        "u": "https://www.youtube.com/results?search_query=Missing%20Semester%20MIT%20lecture",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Что происходит, когда вводишь URL в браузер",
        "u": "https://www.youtube.com/results?search_query=%D1%87%D1%82%D0%BE%20%D0%BF%D1%80%D0%BE%D0%B8%D1%81%D1%85%D0%BE%D0%B4%D0%B8%D1%82%20%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0%20%D0%B2%D0%B2%D0%BE%D0%B4%D0%B8%D1%88%D1%8C%20%D0%B0%D0%B4%D1%80%D0%B5%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20%D0%B2%20%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%B5%20DNS%20TCP%20TLS",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Компьютерные сети для программистов",
        "u": "https://www.youtube.com/results?search_query=%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D1%8B%D0%B5%20%D1%81%D0%B5%D1%82%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%81%D1%82%D0%B0%20TCP%20IP%20%D0%BA%D1%83%D1%80%D1%81%20%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D0%B8",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "go-basics",
    "line": "go",
    "title": "Основы Go",
    "short": "Основы Go",
    "weeks": 3,
    "goal": "Писать идиоматичный Go: понимать слайсы, интерфейсы и ошибки так, чтобы не попадаться на типичные ловушки собеседований.",
    "topics": [
      {
        "h": "Инструменты",
        "items": [
          "<code>go mod</code>, <code>go run/build/test</code>, <code>go vet</code>, <code>gofmt</code>, <code>golangci-lint</code>",
          "Структура проекта: <code>cmd/</code>, <code>internal/</code>, <code>pkg/</code> и почему internal важен",
          "Актуальная версия — Go 1.27 (август 2026). <code>go fix</code> с модернизаторами сам переписывает код на новые идиомы"
        ]
      },
      {
        "h": "Типы и структуры",
        "items": [
          "Базовые типы, нулевые значения, константы и <code>iota</code>, указатели",
          "Структуры, встраивание, методы, value receiver против pointer receiver",
          "Дженерики: type parameters, constraints, <code>comparable</code>; с Go 1.27 — generic-методы (но интерфейс по-прежнему нельзя реализовать generic-методом). Когда дженерики не нужны"
        ]
      },
      {
        "h": "Коллекции и строки",
        "items": [
          "Массив против слайса: <code>len</code>, <code>cap</code>, <code>append</code> и перевыделение, общий базовый массив",
          "Map: случайный порядок обхода, nil-map, не потокобезопасна",
          "Строки, байты и руны, UTF-8, <code>strings.Builder</code>"
        ]
      },
      {
        "h": "Интерфейсы и ошибки",
        "items": [
          "Неявная реализация интерфейсов, <code>any</code>, type assertion и type switch",
          "Ловушка: интерфейс, содержащий nil-указатель, не равен nil",
          "Принцип «принимай интерфейсы, возвращай структуры», маленькие интерфейсы",
          "Ошибки как значения: <code>fmt.Errorf</code> с <code>%w</code>, <code>errors.Is</code>, <code>errors.As</code>, sentinel-ошибки",
          "<code>panic</code> и <code>recover</code> — когда это уместно (почти никогда)"
        ]
      },
      {
        "h": "Поток управления и стандартная библиотека",
        "items": [
          "<code>defer</code>: порядок LIFO и момент вычисления аргументов, замыкания",
          "Семантика переменной цикла после Go 1.22, range по числу",
          "<code>encoding/json</code> и теги, <code>io.Reader</code>/<code>io.Writer</code>, <code>bufio</code>, <code>os</code>, <code>flag</code>, <code>time</code>, <code>log/slog</code>"
        ]
      }
    ],
    "practice": [
      "Пройди Tour of Go целиком, затем реши 15 примеров из Go by Example, не подглядывая в решение.",
      "Напиши generic <code>Stack[T]</code> и <code>Set[T comparable]</code> с методами и тестами.",
      "Утилита <code>wc</code>: считает строки, слова и байты из файла или stdin через <code>io.Reader</code>.",
      "Конвертер CSV в JSON с флагами командной строки и понятными ошибками.",
      "Напиши функцию, которая делает append к слайсу-аргументу, и объясни, почему вызывающий код иногда видит изменения, а иногда нет."
    ],
    "resources": [
      {
        "t": "A Tour of Go",
        "u": "https://go.dev/tour/"
      },
      {
        "t": "Go by Example",
        "u": "https://gobyexample.com/"
      },
      {
        "t": "Effective Go",
        "u": "https://go.dev/doc/effective_go"
      },
      {
        "t": "Learn Go with Tests",
        "u": "https://quii.gitbook.io/learn-go-with-tests"
      },
      {
        "t": "100 Go Mistakes and How to Avoid Them",
        "u": "https://100go.co/"
      },
      {
        "t": "Книга: The Go Programming Language (Донован, Керниган)",
        "u": "https://www.gopl.io/"
      }
    ],
    "quiz": [
      {
        "q": "<code>s := make([]int, 3, 10)</code>, затем <code>s = append(s, 1)</code>. Чему равны len и cap?",
        "o": [
          "3 и 10",
          "4 и 10",
          "4 и 20",
          "1 и 10"
        ],
        "a": 1,
        "why": "make создаёт 3 нулевых элемента с ёмкостью 10. Append помещается в ёмкость, перевыделения нет."
      },
      {
        "q": "Что произойдёт при записи в nil-map?",
        "o": [
          "Map создастся автоматически",
          "Запись проигнорируется",
          "panic",
          "Ошибка компиляции"
        ],
        "a": 2,
        "why": "Чтение из nil-map вернёт нулевое значение, а запись паникует. Инициализируй через make или литерал."
      },
      {
        "q": "В каком порядке выполнятся три defer в функции?",
        "o": [
          "В порядке объявления",
          "В обратном порядке (LIFO)",
          "Параллельно",
          "Порядок не определён"
        ],
        "a": 1,
        "why": "Отложенные вызовы складываются в стек."
      },
      {
        "q": "<code>var p *MyErr = nil; var err error = p</code>. Чему равно <code>err == nil</code>?",
        "o": [
          "true",
          "false",
          "Ошибка компиляции",
          "panic"
        ],
        "a": 1,
        "why": "Интерфейс равен nil, только если и тип, и значение nil. Здесь тип *MyErr задан. Не возвращай типизированный nil как error."
      },
      {
        "q": "Как проверить, есть ли в цепочке обёрнутых ошибок конкретная sentinel-ошибка?",
        "o": [
          "err == ErrNotFound",
          "errors.Is(err, ErrNotFound)",
          "errors.As(err, ErrNotFound)",
          "strings.Contains(err.Error(), ...)"
        ],
        "a": 1,
        "why": "errors.Is разворачивает цепочку %w. errors.As нужен, чтобы достать ошибку конкретного типа."
      },
      {
        "q": "Чем метод с pointer receiver отличается от value receiver?",
        "o": [
          "Ничем",
          "Может менять исходную структуру и не копирует её",
          "Работает только с интерфейсами",
          "Быстрее компилируется"
        ],
        "a": 1,
        "why": "Value receiver получает копию. Если хотя бы один метод требует указатель, обычно делают все методы типа с указателем."
      },
      {
        "q": "Сколько вернёт len для строки «привет»?",
        "o": [
          "6",
          "12",
          "7",
          "Зависит от ОС"
        ],
        "a": 1,
        "why": "len возвращает число байт. Кириллица в UTF-8 занимает 2 байта на символ. Для символов используй utf8.RuneCountInString."
      },
      {
        "q": "Зачем нужна папка internal/?",
        "o": [
          "Для тестов",
          "Пакеты из неё нельзя импортировать за пределами родительского модуля",
          "Для приватных переменных",
          "Это просто соглашение без эффекта"
        ],
        "a": 1,
        "why": "Компилятор запрещает импорт internal-пакетов извне, это настоящая граница."
      }
    ],
    "videos": [
      {
        "t": "Канал Николая Тузова — Go на русском",
        "u": "https://www.youtube.com/c/%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9%D0%A2%D1%83%D0%B7%D0%BE%D0%B2",
        "lang": "ru",
        "kind": "channel"
      },
      {
        "t": "Go с нуля: курсы и разборы",
        "u": "https://www.youtube.com/results?search_query=Golang%20%D1%81%20%D0%BD%D1%83%D0%BB%D1%8F%20%D0%BA%D1%83%D1%80%D1%81%20%D0%BD%D0%B0%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%BC",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Слайсы, map и интерфейсы изнутри",
        "u": "https://www.youtube.com/results?search_query=Go%20%D1%81%D0%BB%D0%B0%D0%B9%D1%81%D1%8B%20map%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81%D1%8B%20%D0%BF%D0%BE%D0%B4%20%D0%BA%D0%B0%D0%BF%D0%BE%D1%82%D0%BE%D0%BC%20%D1%81%D0%BE%D0%B1%D0%B5%D1%81%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "testing",
    "line": "quality",
    "title": "Тестирование в Go",
    "short": "Тесты",
    "weeks": 1.5,
    "goal": "Писать тесты с первого дня: table-driven unit-тесты, моки через интерфейсы, интеграционные тесты с настоящими базами в контейнерах.",
    "topics": [
      {
        "h": "Основа",
        "items": [
          "Пирамида тестов: unit, интеграционные, e2e. Что проверять на каждом уровне",
          "Пакет <code>testing</code>: <code>t.Run</code>, table-driven тесты, <code>t.Helper</code>, <code>t.Parallel</code>, <code>t.Cleanup</code>, <code>testdata/</code>, golden-файлы",
          "testify (<code>assert</code> и <code>require</code>), go-cmp для сравнения структур",
          "TDD-цикл: красный, зелёный, рефакторинг",
          "<code>testing/synctest</code> (стабилен с Go 1.25): тесты конкурентного кода с виртуальным временем вместо <code>time.Sleep</code>"
        ]
      },
      {
        "h": "Подмены",
        "items": [
          "Интерфейсы как точки подмены зависимостей",
          "Fake, stub, mock — в чём разница. mockery и gomock",
          "<code>httptest.NewRecorder</code> и <code>httptest.NewServer</code>"
        ]
      },
      {
        "h": "Интеграция и производительность",
        "items": [
          "testcontainers-go: настоящий Postgres, Redis, Kafka в тестах",
          "Build tags для разделения быстрых и медленных тестов",
          "Покрытие: <code>-cover</code>, <code>-coverprofile</code>, почему 100% — не цель",
          "Бенчмарки: <code>for b.Loop()</code> (Go 1.24+) вместо цикла по <code>b.N</code>, <code>b.ReportAllocs</code>, benchstat",
          "Fuzzing через <code>testing.F</code>, детектор гонок <code>-race</code>"
        ]
      }
    ],
    "practice": [
      "Перепиши тесты из модуля «Основы Go» в table-driven стиле, доведи покрытие до 80%+.",
      "Протестируй HTTP-хендлер через httptest, не поднимая сервер.",
      "Напиши fuzz-тест для своего CSV-парсера и найди хотя бы один падающий вход.",
      "Бенчмарк: склейка строк через + против strings.Builder, сравни через benchstat.",
      "Напиши fake-репозиторий в памяти и протестируй через него сервисный слой."
    ],
    "resources": [
      {
        "t": "Learn Go with Tests",
        "u": "https://quii.gitbook.io/learn-go-with-tests"
      },
      {
        "t": "Документация пакета testing",
        "u": "https://pkg.go.dev/testing"
      },
      {
        "t": "testcontainers-go",
        "u": "https://golang.testcontainers.org/"
      },
      {
        "t": "Книга: Принципы юнит-тестирования (Хориков)",
        "u": "https://www.manning.com/books/unit-testing"
      }
    ],
    "quiz": [
      {
        "q": "Чем require отличается от assert в testify?",
        "o": [
          "Ничем",
          "require останавливает тест при провале, assert продолжает",
          "assert работает только с ошибками",
          "require проверяет только nil"
        ],
        "a": 1,
        "why": "require вызывает t.FailNow. Используй его, когда дальнейшие проверки бессмысленны, например после err != nil."
      },
      {
        "q": "Какой флаг включает детектор гонок?",
        "o": [
          "-v",
          "-race",
          "-cover",
          "-count=1"
        ],
        "a": 1,
        "why": "go test -race. В CI его стоит включать всегда."
      },
      {
        "q": "Зачем вызывать t.Helper() во вспомогательной функции?",
        "o": [
          "Ускоряет тест",
          "Строка ошибки укажет на место вызова хелпера, а не внутрь него",
          "Запускает тест параллельно",
          "Отключает кэш"
        ],
        "a": 1,
        "why": "Без t.Helper все падения будут указывать на одну строку внутри хелпера."
      },
      {
        "q": "Что такое fake в терминах тестовых двойников?",
        "o": [
          "Объект, который проверяет, какие методы вызывались",
          "Рабочая упрощённая реализация, например репозиторий в памяти",
          "Заглушка, возвращающая константу",
          "Тест, который всегда проходит"
        ],
        "a": 1,
        "why": "Mock проверяет взаимодействия, stub отдаёт заготовленные ответы, fake реально работает, но проще."
      },
      {
        "q": "Что означает b.N в бенчмарке?",
        "o": [
          "Число CPU",
          "Число итераций, которое подбирает фреймворк",
          "Номер бенчмарка",
          "Лимит памяти"
        ],
        "a": 1,
        "why": "Фреймворк увеличивает b.N, пока замер не станет устойчивым. С Go 1.24 удобнее писать for b.Loop() — он сам управляет итерациями и не даёт компилятору выкинуть код."
      },
      {
        "q": "Как лучше тестировать репозиторий, работающий с PostgreSQL?",
        "o": [
          "Мокать database/sql",
          "Поднимать настоящий Postgres через testcontainers",
          "SQLite в памяти",
          "Не тестировать"
        ],
        "a": 1,
        "why": "SQL-диалект, ограничения и транзакции проверяются только настоящей базой."
      }
    ],
    "videos": [
      {
        "t": "Mitchell Hashimoto — Advanced Testing with Go (GopherCon 2017)",
        "u": "https://www.youtube.com/results?search_query=GopherCon%202017%20Advanced%20Testing%20with%20Go%20Mitchell%20Hashimoto",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Тестирование в Go: table-driven, моки, testify",
        "u": "https://www.youtube.com/results?search_query=%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B2%20Go%20table%20driven%20testify%20%D0%BC%D0%BE%D0%BA%D0%B8",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "testcontainers-go: интеграционные тесты с базой",
        "u": "https://www.youtube.com/results?search_query=testcontainers%20go%20%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D1%82%D0%B5%D1%81%D1%82%D1%8B%20postgres",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "go-concurrency",
    "line": "go",
    "title": "Конкурентность в Go",
    "short": "Конкурентность",
    "weeks": 2,
    "goal": "Свободно применять горутины, каналы и context; писать worker pool и graceful shutdown без гонок и утечек.",
    "topics": [
      {
        "h": "Примитивы",
        "items": [
          "Горутины: стоимость, растущий стек, утечки горутин",
          "Каналы: буферизированные и нет, закрытие (закрывает отправитель), чтение из закрытого, nil-канал, направленные каналы",
          "<code>select</code>: default, таймауты, мультиплексирование",
          "<code>sync</code>: Mutex, RWMutex, WaitGroup (и метод <code>wg.Go</code> из Go 1.25), Once, Pool, Cond; типы <code>atomic.Int64</code> и другие из <code>sync/atomic</code>",
          "<code>golang.org/x/sync</code>: errgroup, semaphore, singleflight"
        ]
      },
      {
        "h": "context",
        "items": [
          "Отмена и дедлайны, прокидывание через все слои",
          "<code>WithValue</code> — только для данных уровня запроса (request id, trace)",
          "<code>signal.NotifyContext</code> для graceful shutdown"
        ]
      },
      {
        "h": "Паттерны и проблемы",
        "items": [
          "Worker pool, pipeline, fan-in и fan-out, ограничение частоты через <code>x/time/rate</code>",
          "Data race против race condition, deadlock, livelock",
          "Модель памяти Go и отношение happens-before",
          "Утечки горутин: профиль <code>goroutineleak</code> (эксперимент в Go 1.26), uber-go/goleak в тестах"
        ]
      }
    ],
    "practice": [
      "Worker pool на N воркеров обрабатывает 10 000 задач и завершается по <code>context.WithTimeout</code>.",
      "Pipeline на каналах: генератор, возведение в квадрат, фильтр, сумма. С корректным закрытием.",
      "Параллельный загрузчик URL с errgroup и лимитом одновременных запросов.",
      "Найди гонку в счётчике через -race, почини через Mutex, потом через atomic, сравни бенчмарком.",
      "HTTP-сервер с graceful shutdown: по SIGTERM дожидается активных запросов до 10 секунд."
    ],
    "resources": [
      {
        "t": "Go Concurrency Patterns (Rob Pike)",
        "u": "https://go.dev/talks/2012/concurrency.slide"
      },
      {
        "t": "Блог Go: Pipelines and cancellation",
        "u": "https://go.dev/blog/pipelines"
      },
      {
        "t": "The Go Memory Model",
        "u": "https://go.dev/ref/mem"
      },
      {
        "t": "Книга: Concurrency in Go (Katherine Cox-Buday)",
        "u": "https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/"
      }
    ],
    "quiz": [
      {
        "q": "Что произойдёт при отправке в закрытый канал?",
        "o": [
          "Значение потеряется",
          "Блокировка навсегда",
          "panic",
          "Вернётся ошибка"
        ],
        "a": 2,
        "why": "Отправка в закрытый канал всегда паникует. Поэтому закрывает канал только отправитель."
      },
      {
        "q": "Что вернёт чтение <code>v, ok := &lt;-ch</code> из закрытого пустого канала?",
        "o": [
          "Блокировку",
          "Нулевое значение и ok = false",
          "panic",
          "Последнее отправленное значение"
        ],
        "a": 1,
        "why": "Так range по каналу понимает, что пора выходить."
      },
      {
        "q": "Как ведёт себя case с nil-каналом в select?",
        "o": [
          "panic",
          "Выбирается первым",
          "Никогда не выбирается",
          "Ошибка компиляции"
        ],
        "a": 2,
        "why": "Это полезный приём: обнулив канал, можно выключить ветку select."
      },
      {
        "q": "Где правильно вызывать wg.Add(1)?",
        "o": [
          "Внутри запущенной горутины",
          "До оператора go",
          "После wg.Wait()",
          "Где угодно"
        ],
        "a": 1,
        "why": "Если Add внутри горутины, Wait может отработать раньше, чем горутина стартует. С Go 1.25 проще писать wg.Go(func(){...}) — он сам делает Add и Done."
      },
      {
        "q": "Для чего подходит context.WithValue?",
        "o": [
          "Передавать зависимости вроде БД",
          "Передавать необязательные параметры функций",
          "Данные уровня запроса: request id, trace id",
          "Хранить конфиг"
        ],
        "a": 2,
        "why": "Значения в context не типизированы и не видны в сигнатуре. Зависимости передавай явно."
      },
      {
        "q": "Data race — это:",
        "o": [
          "Любая ошибка логики при параллельности",
          "Одновременный доступ к памяти из горутин, где хотя бы один пишет, без синхронизации",
          "Deadlock",
          "Медленная горутина"
        ],
        "a": 1,
        "why": "Race condition шире: ошибка из-за порядка событий, она бывает и без data race."
      }
    ],
    "videos": [
      {
        "t": "Rob Pike — Concurrency is not Parallelism",
        "u": "https://www.youtube.com/watch?v=cN_DpYBzKso",
        "lang": "en",
        "kind": "video"
      },
      {
        "t": "Rob Pike — Go Concurrency Patterns (Google I/O 2012)",
        "u": "https://www.youtube.com/watch?v=f6kdp27TYZs",
        "lang": "en",
        "kind": "video"
      },
      {
        "t": "Ivan Danyliuk — Visualizing Concurrency in Go",
        "u": "https://www.youtube.com/watch?v=KyuFeiG3Y60",
        "lang": "en",
        "kind": "video"
      },
      {
        "t": "Конкурентность в Go: горутины, каналы, context",
        "u": "https://www.youtube.com/results?search_query=%D0%BA%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D0%B5%D0%BD%D1%82%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D0%B2%20Go%20%D0%B3%D0%BE%D1%80%D1%83%D1%82%D0%B8%D0%BD%D1%8B%20%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%D1%8B%20context%20%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "http-rest",
    "line": "web",
    "title": "HTTP, REST и веб-сервер на Go",
    "short": "HTTP и REST",
    "weeks": 2,
    "goal": "Проектировать понятные REST API и писать на Go надёжные HTTP-серверы и клиенты.",
    "topics": [
      {
        "h": "HTTP",
        "items": [
          "Структура запроса и ответа, методы и их свойства: безопасность и идемпотентность",
          "Коды ответа: 200, 201, 204, 301, 304, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503",
          "Заголовки: Content-Type, Accept, Authorization, Cache-Control, ETag, Location",
          "HTTP/2 (мультиплексирование, HPACK) и HTTP/3 на QUIC — на уровне идей. HTTPS и TLS 1.3",
          "Кэширование: Cache-Control, ETag, If-None-Match, ответ 304",
          "CORS и preflight-запросы"
        ]
      },
      {
        "h": "REST и проектирование API",
        "items": [
          "Ресурсы и URL (<code>/users/42/orders</code>), stateless, единый интерфейс",
          "Пагинация: offset против курсора, фильтры, сортировка",
          "Версионирование API, формат ошибок по RFC 9457 (Problem Details)",
          "Идемпотентность POST через заголовок Idempotency-Key",
          "OpenAPI 3 и кодогенерация (oapi-codegen)"
        ]
      },
      {
        "h": "Go",
        "items": [
          "<code>net/http</code>: Handler, ServeMux с методами и параметрами пути (Go 1.22+), middleware",
          "Роутеры chi, echo, gin — чем отличаются",
          "Таймауты сервера (особенно ReadHeaderTimeout) и клиента; переиспользование http.Client",
          "Валидация входа, лимит размера тела, кодирование JSON"
        ]
      }
    ],
    "practice": [
      "CRUD «задачи» на чистом net/http с хранилищем в памяти, middleware логирования, recovery и request id.",
      "Добавь курсорную пагинацию и ETag с ответом 304.",
      "Опиши API в OpenAPI 3 и сгенерируй серверный интерфейс через oapi-codegen.",
      "HTTP-клиент с ретраями: экспоненциальный backoff с jitter, только для идемпотентных запросов."
    ],
    "resources": [
      {
        "t": "MDN: HTTP",
        "u": "https://developer.mozilla.org/ru/docs/Web/HTTP"
      },
      {
        "t": "RFC 9110 — семантика HTTP",
        "u": "https://www.rfc-editor.org/rfc/rfc9110"
      },
      {
        "t": "Zalando RESTful API Guidelines",
        "u": "https://opensource.zalando.com/restful-api-guidelines/"
      },
      {
        "t": "Книга: Let's Go (Alex Edwards)",
        "u": "https://lets-go.alexedwards.net/"
      }
    ],
    "quiz": [
      {
        "q": "Какой набор методов идемпотентен?",
        "o": [
          "GET, POST, PUT",
          "GET, PUT, DELETE",
          "POST, PATCH",
          "Только GET"
        ],
        "a": 1,
        "why": "Повтор PUT или DELETE даёт то же состояние. POST — нет, PATCH — в общем случае тоже нет."
      },
      {
        "q": "Какой код вернуть при успешном создании ресурса?",
        "o": [
          "200",
          "201",
          "202",
          "204"
        ],
        "a": 1,
        "why": "201 Created и заголовок Location с адресом нового ресурса."
      },
      {
        "q": "Пользователь бронирует уже занятый слот. Какой код уместнее?",
        "o": [
          "400",
          "404",
          "409",
          "500"
        ],
        "a": 2,
        "why": "409 Conflict — конфликт с текущим состоянием ресурса. 422 — когда сами данные семантически неверны."
      },
      {
        "q": "Главное, что дал HTTP/2:",
        "o": [
          "Текстовый формат",
          "Мультиплексирование потоков в одном TCP-соединении",
          "Работу поверх UDP",
          "Отказ от заголовков"
        ],
        "a": 1,
        "why": "UDP (через QUIC) — это уже HTTP/3."
      },
      {
        "q": "Почему http.DefaultClient опасен в продакшене?",
        "o": [
          "Не поддерживает HTTPS",
          "У него нет таймаута",
          "Не переиспользует соединения",
          "Он устарел"
        ],
        "a": 1,
        "why": "Зависший сервер подвесит горутину навсегда. Создавай свой клиент с Timeout."
      },
      {
        "q": "Чем курсорная пагинация лучше offset?",
        "o": [
          "Проще реализовать",
          "Стабильна при вставках и не сканирует пропущенные строки",
          "Позволяет прыгнуть на любую страницу",
          "Не требует индексов"
        ],
        "a": 1,
        "why": "OFFSET 100000 заставляет базу прочитать и выбросить 100000 строк."
      },
      {
        "q": "Когда браузер отправляет preflight OPTIONS?",
        "o": [
          "Всегда",
          "Для «непростых» запросов: PUT, DELETE, JSON, свои заголовки",
          "Только для GET",
          "Только по HTTP/2"
        ],
        "a": 1,
        "why": "Простые GET и POST с формой идут без preflight."
      }
    ],
    "videos": [
      {
        "t": "Hussein Nasser — HTTP Crash Course: 1.0, 1.1, HTTP/2, HTTP/3",
        "u": "https://www.youtube.com/results?search_query=Hussein%20Nasser%20Hyper%20Text%20Transfer%20Protocol%20Crash%20Course",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Николай Тузов — REST API на Go (сокращатель ссылок)",
        "u": "https://www.youtube.com/results?search_query=%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9%20%D0%A2%D1%83%D0%B7%D0%BE%D0%B2%20REST%20API%20Go%20%D1%81%D0%BE%D0%BA%D1%80%D0%B0%D1%89%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%20%D1%81%D1%81%D1%8B%D0%BB%D0%BE%D0%BA",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Как проектировать REST API",
        "u": "https://www.youtube.com/results?search_query=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20REST%20API%20%D0%BB%D1%83%D1%87%D1%88%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B8",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "sql-postgres",
    "line": "data",
    "title": "SQL и PostgreSQL",
    "short": "SQL и Postgres",
    "weeks": 3,
    "goal": "Проектировать схемы, писать сложные запросы, читать EXPLAIN, понимать транзакции и изоляцию так, чтобы не терять деньги в гонках.",
    "topics": [
      {
        "h": "SQL",
        "items": [
          "SELECT, WHERE, JOIN (inner, left, full, cross), GROUP BY, HAVING, подзапросы",
          "CTE и рекурсивные CTE, оконные функции: ROW_NUMBER, RANK, LAG, SUM OVER",
          "UPSERT через <code>ON CONFLICT</code>, RETURNING"
        ]
      },
      {
        "h": "Проектирование",
        "items": [
          "Нормальные формы до 3НФ и BCNF, осознанная денормализация",
          "Ограничения: PK, FK, UNIQUE, CHECK, EXCLUDE",
          "Типы Postgres: uuid (с PostgreSQL 18 есть встроенная <code>uuidv7()</code>), jsonb, timestamptz, numeric для денег, массивы, диапазоны"
        ]
      },
      {
        "h": "Индексы и производительность",
        "items": [
          "B-tree, Hash, GIN (jsonb, полнотекст), GiST, BRIN",
          "Составные индексы и порядок колонок, покрывающие (INCLUDE), частичные индексы",
          "<code>EXPLAIN ANALYZE</code>: Seq Scan, Index Scan, Index Only Scan, Bitmap, Nested Loop, Hash Join",
          "Когда индекс не используется: функции над колонкой, низкая селективность, приведение типов",
          "PostgreSQL 18: skip scan для составных B-tree индексов, асинхронный ввод-вывод при чтении"
        ]
      },
      {
        "h": "Транзакции",
        "items": [
          "ACID; уровни изоляции Read Committed, Repeatable Read, Serializable",
          "Аномалии: грязное чтение, неповторяющееся чтение, фантомы, потерянное обновление, write skew",
          "<code>SELECT ... FOR UPDATE</code>, <code>SKIP LOCKED</code>, оптимистичная блокировка через version",
          "Дедлоки и как их избегать"
        ]
      },
      {
        "h": "Внутренности и Go",
        "items": [
          "MVCC, VACUUM, WAL, репликация (потоковая и логическая), партиционирование, PgBouncer",
          "<code>database/sql</code>, pgx и pgxpool, sqlc, миграции через goose или golang-migrate",
          "Почему с ORM (GORM) стоит быть осторожным"
        ]
      }
    ],
    "practice": [
      "Реши 30 задач на pgexercises.com и sql-ex.ru, включая оконные функции.",
      "Спроектируй схему магазина (users, products, orders, order_items, payments) до 3НФ и нарисуй ERD.",
      "Сгенерируй миллион строк через generate_series, найди медленный запрос, ускорь индексом. Приложи EXPLAIN ANALYZE до и после.",
      "Воспроизведи lost update в двух сессиях psql и исправь тремя способами: FOR UPDATE, version-колонка, атомарный UPDATE.",
      "Очередь задач на Postgres через <code>FOR UPDATE SKIP LOCKED</code> и несколько воркеров на Go."
    ],
    "resources": [
      {
        "t": "Документация PostgreSQL на русском (Postgres Pro)",
        "u": "https://postgrespro.ru/docs/postgresql"
      },
      {
        "t": "Книга «PostgreSQL изнутри» (Е. Рогов, бесплатно)",
        "u": "https://postgrespro.ru/education/books/internals"
      },
      {
        "t": "Use The Index, Luke",
        "u": "https://use-the-index-luke.com/ru"
      },
      {
        "t": "PostgreSQL Exercises",
        "u": "https://pgexercises.com/"
      },
      {
        "t": "sqlc",
        "u": "https://sqlc.dev/"
      },
      {
        "t": "Книга: Designing Data-Intensive Applications (Клеппман)",
        "u": "https://dataintensive.net/"
      }
    ],
    "quiz": [
      {
        "q": "Какой уровень изоляции в PostgreSQL по умолчанию?",
        "o": [
          "Read Uncommitted",
          "Read Committed",
          "Repeatable Read",
          "Serializable"
        ],
        "a": 1,
        "why": "Каждый запрос видит снимок на момент своего начала, а не транзакции."
      },
      {
        "q": "Есть индекс (a, b). Какой фильтр использует его хуже всего?",
        "o": [
          "WHERE a = 1",
          "WHERE a = 1 AND b = 2",
          "WHERE b = 2",
          "WHERE a = 1 ORDER BY b"
        ],
        "a": 2,
        "why": "Составной B-tree упорядочен сначала по a. В PostgreSQL 18 появился skip scan, и он выручает, если у a мало различных значений, но в общем случае порядок колонок в индексе по-прежнему решает."
      },
      {
        "q": "Какой индекс подходит для поиска внутри jsonb?",
        "o": [
          "B-tree",
          "GIN",
          "Hash",
          "BRIN"
        ],
        "a": 1,
        "why": "GIN индексирует ключи и элементы внутри документа."
      },
      {
        "q": "Что делает VACUUM?",
        "o": [
          "Удаляет таблицы",
          "Освобождает место мёртвых версий строк для повторного использования",
          "Пересоздаёт индексы",
          "Сжимает WAL"
        ],
        "a": 1,
        "why": "MVCC оставляет старые версии строк после UPDATE и DELETE, их надо чистить."
      },
      {
        "q": "Какую аномалию предотвращает Serializable, но не Repeatable Read в Postgres?",
        "o": [
          "Грязное чтение",
          "Неповторяющееся чтение",
          "Write skew",
          "Потерю коммита"
        ],
        "a": 2,
        "why": "Пример: два врача одновременно снимаются с дежурства, каждый видит, что второй ещё дежурит."
      },
      {
        "q": "Какой тип выбрать для денежных сумм?",
        "o": [
          "float8",
          "real",
          "numeric или целые копейки в bigint",
          "text"
        ],
        "a": 2,
        "why": "Числа с плавающей точкой не представляют 0.1 точно."
      },
      {
        "q": "Чем HAVING отличается от WHERE?",
        "o": [
          "Ничем",
          "HAVING фильтрует группы после агрегации",
          "HAVING работает быстрее",
          "WHERE только для JOIN"
        ],
        "a": 1,
        "why": "WHERE отбирает строки до GROUP BY, HAVING — результаты агрегатов."
      }
    ],
    "videos": [
      {
        "t": "Postgres Professional — QPT. Оптимизация запросов",
        "u": "https://www.youtube.com/playlist?list=PLaFqU3KCWw6K2sTAksX5AJq4SQDN5PA1t",
        "lang": "ru",
        "kind": "playlist"
      },
      {
        "t": "Postgres Professional — Технологии баз данных (лекции)",
        "u": "https://www.youtube.com/playlist?list=PLaFqU3KCWw6K5maTyTF2NdcbpNsPHRecu",
        "lang": "ru",
        "kind": "playlist"
      },
      {
        "t": "Уровни изоляции и MVCC в PostgreSQL",
        "u": "https://www.youtube.com/results?search_query=%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8%20%D0%B8%D0%B7%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D0%B8%20%D1%82%D1%80%D0%B0%D0%BD%D0%B7%D0%B0%D0%BA%D1%86%D0%B8%D0%B9%20PostgreSQL%20MVCC",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "docker",
    "line": "infra",
    "title": "Docker и Docker Compose",
    "short": "Docker",
    "weeks": 1.5,
    "goal": "Понимать, что такое контейнер на самом деле, собирать маленькие безопасные образы и поднимать всё окружение проекта одной командой.",
    "topics": [
      {
        "h": "Как это устроено",
        "items": [
          "Контейнер — это процесс Linux, изолированный через namespaces (pid, net, mnt, uts, ipc, user) и ограниченный через cgroups. Не виртуальная машина",
          "Образ и контейнер, слои и union filesystem (overlay2), copy-on-write",
          "Docker Engine, containerd и runc; стандарт образов OCI; Podman как альтернатива без демона"
        ]
      },
      {
        "h": "Dockerfile",
        "items": [
          "FROM, RUN, COPY, ENV, ARG, WORKDIR, USER, EXPOSE, ENTRYPOINT и CMD — и разница между последними двумя",
          "Кэш слоёв: сначала <code>go.mod</code> и <code>go.sum</code>, потом <code>go mod download</code>, потом исходники",
          "Multi-stage сборка, финальный образ на distroless или scratch, <code>CGO_ENABLED=0</code>",
          "BuildKit: cache mounts (<code>--mount=type=cache</code>) для модулей и кэша сборки, сборка под несколько архитектур через buildx",
          "<code>.dockerignore</code>, запуск не от root, фиксированные версии базовых образов"
        ]
      },
      {
        "h": "Сеть, данные, ресурсы",
        "items": [
          "Сети: bridge, host, none; пользовательская сеть и DNS по имени сервиса; публикация портов",
          "Данные: volumes против bind mounts, tmpfs. Где живёт база данных и как её не потерять",
          "Лимиты CPU и памяти, политики перезапуска, логи (<code>docker logs</code>, драйверы логирования)",
          "Отладка: <code>docker exec</code>, <code>inspect</code>, <code>stats</code>, <code>events</code>"
        ]
      },
      {
        "h": "Compose",
        "items": [
          "Сервисы, сети, volumes, переменные окружения и файлы <code>.env</code>",
          "<code>healthcheck</code> и <code>depends_on</code> с <code>condition: service_healthy</code>",
          "Профили, override-файлы для разработки и прода, <code>docker compose watch</code> для живой перезагрузки"
        ]
      },
      {
        "h": "Безопасность и реестры",
        "items": [
          "Сканирование образов: Trivy, Docker Scout",
          "Реестры: Docker Hub, GitHub Container Registry, теги и digest",
          "Секреты не кладут в образ и не передают через ARG"
        ]
      }
    ],
    "practice": [
      "Собери образ Go-сервиса двумя способами: на <code>golang</code> и multi-stage на distroless. Сравни размер и количество уязвимостей в Trivy.",
      "Ускорь пересборку через BuildKit cache mounts и замерь время до и после.",
      "Compose: сервис, PostgreSQL, миграции и Adminer. Сервис стартует только после того, как база прошла healthcheck.",
      "Запусти контейнер с лимитом памяти 64 МБ, вызови OOM и найди его в <code>docker inspect</code> и <code>docker events</code>.",
      "Без Docker: создай изолированный процесс через <code>unshare</code>, чтобы увидеть, что контейнер — это просто процесс."
    ],
    "resources": [
      {
        "t": "Документация Docker",
        "u": "https://docs.docker.com/"
      },
      {
        "t": "Dockerfile: best practices",
        "u": "https://docs.docker.com/build/building/best-practices/"
      },
      {
        "t": "Справочник Compose",
        "u": "https://docs.docker.com/reference/compose-file/"
      },
      {
        "t": "Trivy",
        "u": "https://trivy.dev/"
      },
      {
        "t": "Play with Docker — песочница в браузере",
        "u": "https://labs.play-with-docker.com/"
      }
    ],
    "quiz": [
      {
        "q": "Чем контейнер принципиально отличается от виртуальной машины?",
        "o": [
          "Ничем",
          "Контейнер — изолированный процесс на общем ядре хоста, а у ВМ своё ядро",
          "Контейнер всегда быстрее и безопаснее",
          "Контейнеры работают только в облаке"
        ],
        "a": 1,
        "why": "Изоляция обеспечивается namespaces и cgroups ядра Linux. Поэтому контейнер стартует за миллисекунды, но изоляция слабее, чем у ВМ."
      },
      {
        "q": "Чем ENTRYPOINT отличается от CMD?",
        "o": [
          "Ничем",
          "ENTRYPOINT задаёт исполняемый файл, CMD — аргументы по умолчанию, которые легко переопределить",
          "CMD выполняется при сборке",
          "ENTRYPOINT нельзя использовать с scratch"
        ],
        "a": 1,
        "why": "docker run image args заменяет только CMD."
      },
      {
        "q": "Как контейнеры в одной Compose-сети находят друг друга?",
        "o": [
          "Только по IP",
          "По имени сервиса через встроенный DNS",
          "Через localhost",
          "Через порт хоста"
        ],
        "a": 1,
        "why": "Поэтому в строке подключения пишут host=postgres, а не localhost."
      },
      {
        "q": "Где хранить данные PostgreSQL в Compose?",
        "o": [
          "Внутри слоя контейнера",
          "В именованном volume",
          "В образе",
          "В переменной окружения"
        ],
        "a": 1,
        "why": "Слой контейнера исчезает вместе с контейнером. Volume живёт отдельно."
      },
      {
        "q": "Почему depends_on без условия не гарантирует, что база готова?",
        "o": [
          "Гарантирует",
          "Он ждёт только запуска контейнера, а не готовности процесса внутри",
          "Он не работает в Compose v2",
          "Он работает только с MySQL"
        ],
        "a": 1,
        "why": "Нужен healthcheck на базе и condition: service_healthy."
      },
      {
        "q": "Как правильно передать секрет при сборке образа?",
        "o": [
          "Через ARG",
          "Через ENV",
          "Через secret mount BuildKit",
          "Записать в Dockerfile"
        ],
        "a": 2,
        "why": "ARG и ENV остаются в истории образа и видны через docker history."
      }
    ],
    "videos": [
      {
        "t": "Основы Docker за полтора часа",
        "u": "https://www.youtube.com/watch?v=QF4ZF857m44",
        "lang": "ru",
        "kind": "video"
      },
      {
        "t": "TechWorld with Nana — Docker Crash Course",
        "u": "https://www.youtube.com/results?search_query=TechWorld%20with%20Nana%20Docker%20Crash%20Course%20for%20Absolute%20Beginners",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Multi-stage сборка Go-приложения",
        "u": "https://www.youtube.com/results?search_query=Docker%20multi-stage%20build%20Golang%20distroless",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "nginx",
    "line": "infra",
    "title": "Nginx и продакшен-сеть",
    "short": "Nginx",
    "weeks": 1,
    "goal": "Поставить сервис за Nginx: reverse proxy, TLS, балансировка, лимиты, кэш и WebSocket — и понимать, где искать проблему, когда что-то отвечает 502.",
    "topics": [
      {
        "h": "Основы",
        "items": [
          "Архитектура: master и worker-процессы, событийная модель, <code>worker_connections</code>",
          "Структура конфига: http, server, location; порядок выбора location (точное =, префикс ^~, регулярные ~ и ~*, самый длинный префикс)",
          "<code>nginx -t</code>, <code>nginx -s reload</code> без простоя; access и error логи, свой формат лога с временем апстрима"
        ]
      },
      {
        "h": "Reverse proxy и балансировка",
        "items": [
          "<code>proxy_pass</code> и тонкость со слэшем на конце, <code>upstream</code>",
          "Заголовки: Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto; модуль real_ip за балансировщиком",
          "Балансировка: round robin, least_conn, ip_hash, веса, <code>max_fails</code>, keepalive к апстримам",
          "Таймауты: <code>proxy_connect_timeout</code>, <code>proxy_read_timeout</code>; разница между 502 и 504",
          "WebSocket: <code>proxy_http_version 1.1</code> и заголовки Upgrade и Connection; gRPC через <code>grpc_pass</code>"
        ]
      },
      {
        "h": "HTTPS и производительность",
        "items": [
          "TLS-терминация, сертификаты Let's Encrypt через certbot, автопродление",
          "HTTP/2, редирект с HTTP на HTTPS, HSTS и другие заголовки безопасности",
          "Сжатие gzip, раздача статики, <code>proxy_cache</code> для ответов API"
        ]
      },
      {
        "h": "Защита",
        "items": [
          "<code>limit_req</code> и <code>limit_conn</code> — rate limiting на границе",
          "<code>client_max_body_size</code>, скрытие версии (<code>server_tokens off</code>)"
        ]
      },
      {
        "h": "Альтернативы и Kubernetes",
        "items": [
          "Caddy (автоматический HTTPS), Traefik (конфиг из Docker-меток), HAProxy, Envoy",
          "Контроллер ingress-nginx для Kubernetes выведен из поддержки в марте 2026 года; для новых кластеров берут Gateway API"
        ]
      }
    ],
    "practice": [
      "Поставь два инстанса своего сервиса за Nginx в Compose, проверь round robin и least_conn нагрузочным тестом.",
      "Останови один инстанс и посмотри, как Nginx исключает его из балансировки. Найди это в error.log.",
      "Добавь limit_req: 10 запросов в секунду с burst 20, получи 429 нагрузкой.",
      "Настрой proxy_cache для GET-ручки с заголовком X-Cache-Status и проверь HIT и MISS.",
      "Специально получи 502 и 504 и объясни разницу по логам."
    ],
    "resources": [
      {
        "t": "Документация Nginx",
        "u": "https://nginx.org/ru/docs/"
      },
      {
        "t": "Начало работы (Beginner's Guide) на русском",
        "u": "https://nginx.org/ru/docs/beginners_guide.html"
      },
      {
        "t": "Mozilla SSL Configuration Generator",
        "u": "https://ssl-config.mozilla.org/"
      },
      {
        "t": "Certbot",
        "u": "https://certbot.eff.org/"
      },
      {
        "t": "Kubernetes: Ingress NGINX retirement",
        "u": "https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/"
      }
    ],
    "quiz": [
      {
        "q": "Что значит ошибка 502 Bad Gateway от Nginx?",
        "o": [
          "Клиент прислал неверный запрос",
          "Апстрим вернул некорректный ответ или соединение с ним не удалось",
          "Апстрим не ответил вовремя",
          "Nginx перегружен"
        ],
        "a": 1,
        "why": "Если апстрим просто не успел ответить, будет 504 Gateway Timeout."
      },
      {
        "q": "Какие заголовки нужны, чтобы проксировать WebSocket?",
        "o": [
          "Никакие",
          "Upgrade и Connection, плюс proxy_http_version 1.1",
          "Только Host",
          "Content-Type"
        ],
        "a": 1,
        "why": "Nginx по умолчанию не передаёт hop-by-hop заголовки, их задают явно."
      },
      {
        "q": "Как сервис за Nginx узнаёт реальный IP клиента?",
        "o": [
          "Из адреса соединения",
          "Из X-Forwarded-For или X-Real-IP, которые выставляет Nginx",
          "Никак",
          "Из cookie"
        ],
        "a": 1,
        "why": "Соединение к сервису приходит от Nginx. Доверять этим заголовкам можно только от своего прокси."
      },
      {
        "q": "Какая директива ограничивает частоту запросов?",
        "o": [
          "limit_conn",
          "limit_req",
          "client_max_body_size",
          "keepalive"
        ],
        "a": 1,
        "why": "limit_conn ограничивает число одновременных соединений, а не частоту."
      },
      {
        "q": "Что безопасно сделать после правки конфига на проде?",
        "o": [
          "Перезапустить контейнер",
          "nginx -t, затем nginx -s reload",
          "Перезагрузить сервер",
          "Удалить логи"
        ],
        "a": 1,
        "why": "reload поднимает новых воркеров с новым конфигом, старые дорабатывают текущие запросы."
      },
      {
        "q": "Что рекомендуют для входящего трафика в новых Kubernetes-кластерах?",
        "o": [
          "ingress-nginx",
          "Gateway API",
          "NodePort на каждый сервис",
          "hostNetwork"
        ],
        "a": 1,
        "why": "Проект ingress-nginx завершил поддержку в марте 2026 года, а Gateway API — официальный преемник Ingress."
      }
    ],
    "videos": [
      {
        "t": "Hussein Nasser — NginX Crash Course (L4/L7 proxy, TLS 1.3, HTTP/2)",
        "u": "https://www.youtube.com/results?search_query=Hussein%20Nasser%20NginX%20Crash%20Course%20Layer%204%20Layer%207%20Proxy",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Nginx как reverse proxy и балансировщик",
        "u": "https://www.youtube.com/results?search_query=nginx%20reverse%20proxy%20%D0%B1%D0%B0%D0%BB%D0%B0%D0%BD%D1%81%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%20%D1%81%20%D0%BD%D1%83%D0%BB%D1%8F",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "HTTPS с Let's Encrypt и certbot",
        "u": "https://www.youtube.com/results?search_query=nginx%20certbot%20let's%20encrypt%20https%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "architecture",
    "line": "arch",
    "title": "Архитектура: от монолита к микросервисам",
    "short": "Архитектура",
    "weeks": 2,
    "goal": "Строить сервисы по Clean Architecture, понимать, когда нужен монолит, а когда микросервисы, и знать паттерны надёжности распределённых систем.",
    "topics": [
      {
        "h": "Код внутри сервиса",
        "items": [
          "Clean Architecture в Go: domain, usecase, adapters (repository, http), infrastructure. Зависимости направлены внутрь",
          "Тот же принцип, что во Flutter: domain не знает о data и presentation. Опыт переносится напрямую",
          "Интерфейсы объявляются на стороне потребителя (в usecase), а не реализации",
          "Hexagonal (ports and adapters), SOLID, ручной DI в main; wire и fx — обзор",
          "DDD-базис: entity, value object, aggregate, bounded context, единый язык",
          "Прочитай один реальный open-source сервис целиком и нарисуй его слои — это быстрее любой статьи"
        ]
      },
      {
        "h": "Форма системы",
        "items": [
          "Монолит, модульный монолит, микросервисы: стоимость и выгоды, закон Конвея",
          "Синхронное (REST, gRPC) и асинхронное (события) взаимодействие",
          "API Gateway, service discovery, backend for frontend (BFF для мобильного клиента)"
        ]
      },
      {
        "h": "Надёжность",
        "items": [
          "Timeout, retry с backoff, circuit breaker, bulkhead, rate limiting, идемпотентность",
          "Распределённые транзакции: почему избегают 2PC; Saga (оркестрация и хореография)",
          "Transactional Outbox, Inbox и дедупликация",
          "CQRS и Event Sourcing — обзор"
        ]
      }
    ],
    "practice": [
      "Перестрой CRUD из модуля HTTP в Clean Architecture. Usecase-слой покрыт unit-тестами без базы.",
      "Нарисуй C4-диаграммы Context и Container для интернет-магазина.",
      "Напиши ADR (Architecture Decision Record): монолит или микросервисы для стартапа из трёх разработчиков.",
      "Реализуй circuit breaker сам (три состояния) и сравни с sony/gobreaker."
    ],
    "resources": [
      {
        "t": "Three Dots Labs — DDD и Clean Architecture на Go",
        "u": "https://threedots.tech/"
      },
      {
        "t": "Шаблон go-clean-template (Evrone)",
        "u": "https://github.com/evrone/go-clean-template"
      },
      {
        "t": "microservices.io — каталог паттернов",
        "u": "https://microservices.io/patterns/"
      },
      {
        "t": "C4 model",
        "u": "https://c4model.com/"
      },
      {
        "t": "Книга: Building Microservices (Sam Newman)",
        "u": "https://samnewman.io/books/building_microservices_2nd_edition/"
      }
    ],
    "quiz": [
      {
        "q": "Куда направлены зависимости в Clean Architecture?",
        "o": [
          "От домена к базе данных",
          "Внутрь, к доменному слою",
          "Во все стороны",
          "От HTTP к базе"
        ],
        "a": 1,
        "why": "Домен ничего не знает об инфраструктуре; инфраструктура реализует интерфейсы домена и usecase."
      },
      {
        "q": "Где в Go принято объявлять интерфейс репозитория?",
        "o": [
          "В пакете с реализацией на Postgres",
          "В пакете, который его использует (usecase)",
          "В main",
          "В отдельном пакете interfaces"
        ],
        "a": 1,
        "why": "Потребитель знает, какие методы ему нужны. Это держит интерфейсы маленькими."
      },
      {
        "q": "Какую проблему решает Transactional Outbox?",
        "o": [
          "Медленные запросы",
          "Атомарность записи в базу и публикации события",
          "Шардирование",
          "Авторизацию"
        ],
        "a": 1,
        "why": "Событие пишется в таблицу outbox в той же транзакции, а отдельный процесс публикует его в брокер."
      },
      {
        "q": "Saga в стиле хореографии — это:",
        "o": [
          "Центральный оркестратор управляет шагами",
          "Сервисы реагируют на события друг друга без координатора",
          "Двухфазный коммит",
          "Распределённая блокировка"
        ],
        "a": 1,
        "why": "Проще на старте, но поток сложнее отследить. Оркестрация явно описывает процесс."
      },
      {
        "q": "Circuit breaker в состоянии open:",
        "o": [
          "Пропускает все запросы",
          "Сразу отклоняет запросы, не нагружая упавший сервис",
          "Повторяет запрос трижды",
          "Кэширует ответы"
        ],
        "a": 1,
        "why": "Через время он переходит в half-open и пробует несколько запросов."
      },
      {
        "q": "Главный аргумент за модульный монолит на старте проекта:",
        "o": [
          "Лучше масштабируется",
          "Простой деплой и дешёвый перенос границ между модулями",
          "Разные языки в одном сервисе",
          "Нет нужды в тестах"
        ],
        "a": 1,
        "why": "Границы сервисов дорого менять. Модули можно вынести в сервисы, когда границы устоятся."
      }
    ],
    "videos": [
      {
        "t": "Чистая архитектура на Go: разбор проекта",
        "u": "https://www.youtube.com/results?search_query=%D1%87%D0%B8%D1%81%D1%82%D0%B0%D1%8F%20%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0%20Golang%20clean%20architecture%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "HighLoad++: микросервисы, Saga, Outbox",
        "u": "https://www.youtube.com/results?search_query=HighLoad%20%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B%20saga%20transactional%20outbox%20%D0%B4%D0%BE%D0%BA%D0%BB%D0%B0%D0%B4",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Three Dots Labs — DDD в Go",
        "u": "https://www.youtube.com/results?search_query=Three%20Dots%20Labs%20DDD%20Go",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "redis",
    "line": "data",
    "title": "Redis и кэширование",
    "short": "Redis",
    "weeks": 1.5,
    "goal": "Применять Redis для кэша, лимитов, блокировок и очередей и понимать, где он может подвести.",
    "topics": [
      {
        "h": "Устройство",
        "items": [
          "Хранение в памяти, однопоточное выполнение команд, персистентность RDB и AOF",
          "Структуры: String, Hash, List, Set, Sorted Set, Stream, Bitmap, HyperLogLog, Geo",
          "TTL и политики вытеснения (allkeys-lru, volatile-ttl и другие)",
          "Лицензии: в 2024 Redis ушёл с BSD, появился форк Valkey (Linux Foundation, BSD). С Redis 8 добавлена AGPLv3. В облаках сейчас часто Valkey — протокол и команды совместимы"
        ]
      },
      {
        "h": "Кэширование",
        "items": [
          "Cache-aside, write-through, write-behind; инвалидация",
          "Cache stampede: singleflight, ранний вероятностный перерасчёт, блокировка на прогрев",
          "Горячие ключи и большие ключи"
        ]
      },
      {
        "h": "Другие применения",
        "items": [
          "Rate limiting: fixed window, sliding window на Sorted Set, token bucket на Lua",
          "Распределённые блокировки через <code>SET NX PX</code> и их ограничения; спор вокруг Redlock",
          "Pub/Sub против Streams с consumer groups",
          "Атомарность: Lua-скрипты, MULTI/EXEC; pipelining"
        ]
      },
      {
        "h": "Масштабирование и Go",
        "items": [
          "Репликация, Sentinel, Redis Cluster и 16384 hash slots",
          "Клиенты go-redis v9 и rueidis (работают и с Valkey)"
        ]
      }
    ],
    "practice": [
      "Cache-aside для <code>GET /items/{id}</code> с инвалидацией при обновлении. Замерь задержку до и после.",
      "Middleware rate limiter на sliding window.",
      "Лидерборд на Sorted Set: топ-10 и позиция конкретного игрока.",
      "Защита от stampede через singleflight, проверка нагрузочным тестом."
    ],
    "resources": [
      {
        "t": "Документация Redis",
        "u": "https://redis.io/docs/latest/"
      },
      {
        "t": "go-redis",
        "u": "https://redis.uptrace.dev/"
      },
      {
        "t": "singleflight",
        "u": "https://pkg.go.dev/golang.org/x/sync/singleflight"
      }
    ],
    "quiz": [
      {
        "q": "Какая структура лучше для лидерборда?",
        "o": [
          "List",
          "Hash",
          "Sorted Set",
          "Set"
        ],
        "a": 2,
        "why": "ZADD, ZRANGE с опцией REV и ZREVRANK работают за логарифмическое время. Отдельная ZREVRANGE с Redis 6.2 считается устаревшей."
      },
      {
        "q": "Почему Redis быстрый при однопоточном выполнении команд?",
        "o": [
          "Он многопоточный",
          "Данные в памяти, нет блокировок, неблокирующий ввод-вывод",
          "Использует GPU",
          "Хранит только строки"
        ],
        "a": 1,
        "why": "Узкое место обычно сеть, а не CPU."
      },
      {
        "q": "Cache stampede — это:",
        "o": [
          "Переполнение памяти Redis",
          "Лавина запросов в базу, когда истекает популярный ключ",
          "Потеря данных при рестарте",
          "Медленная репликация"
        ],
        "a": 1,
        "why": "Сотни запросов одновременно видят промах и идут пересчитывать одно и то же."
      },
      {
        "q": "Какая команда атомарно ставит блокировку с временем жизни?",
        "o": [
          "GET + SET",
          "SETNX, затем EXPIRE",
          "SET key token NX PX 30000",
          "INCR"
        ],
        "a": 2,
        "why": "Два отдельных вызова не атомарны: процесс может упасть между ними и оставить вечный замок."
      },
      {
        "q": "Чем Streams лучше Pub/Sub?",
        "o": [
          "Ничем",
          "Сообщения сохраняются, есть consumer groups и подтверждения",
          "Они быстрее",
          "Не требуют памяти"
        ],
        "a": 1,
        "why": "Pub/Sub теряет сообщения, если подписчик не подключён."
      }
    ],
    "videos": [
      {
        "t": "Redis для бэкендера: кэш, лимиты, блокировки",
        "u": "https://www.youtube.com/results?search_query=Redis%20%D0%B4%D0%BB%D1%8F%20%D0%B1%D1%8D%D0%BA%D0%B5%D0%BD%D0%B4%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B0%20%D0%BA%D1%8D%D1%88%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20rate%20limit",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Cache stampede и стратегии кэширования",
        "u": "https://www.youtube.com/results?search_query=cache%20stampede%20thundering%20herd%20caching%20strategies",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "security",
    "line": "quality",
    "title": "Безопасность и аутентификация",
    "short": "Безопасность",
    "weeks": 1,
    "goal": "Делать вход и права доступа правильно и знать типовые уязвимости бэкенда.",
    "topics": [
      {
        "h": "Аутентификация",
        "items": [
          "Аутентификация против авторизации",
          "Сессии в cookie (HttpOnly, Secure, SameSite) против JWT; access и refresh токены, ротация, отзыв",
          "OAuth 2.0 и OpenID Connect: authorization code с PKCE, роли участников",
          "Хэширование паролей: argon2id или bcrypt, никогда MD5 или SHA для паролей"
        ]
      },
      {
        "h": "Авторизация и уязвимости",
        "items": [
          "RBAC и ABAC, проверка владения ресурсом (IDOR)",
          "OWASP Top 10: инъекции, сломанный контроль доступа, SSRF, XSS, CSRF",
          "SQL-инъекции: только параметризованные запросы"
        ]
      },
      {
        "h": "Инфраструктура",
        "items": [
          "TLS, mTLS между сервисами",
          "Хранение секретов: Vault, Kubernetes Secrets",
          "govulncheck, gosec, обновление зависимостей"
        ]
      }
    ],
    "practice": [
      "Регистрация и вход: argon2id, access и refresh JWT, ротация refresh, выход с отзывом.",
      "Найди IDOR в своём API (пользователь A читает заказ пользователя B) и закрой его тестом.",
      "Добавь govulncheck и gosec в CI."
    ],
    "resources": [
      {
        "t": "OWASP Top 10",
        "u": "https://owasp.org/Top10/"
      },
      {
        "t": "OWASP Cheat Sheet Series",
        "u": "https://cheatsheetseries.owasp.org/"
      },
      {
        "t": "OAuth 2.0",
        "u": "https://oauth.net/2/"
      }
    ],
    "quiz": [
      {
        "q": "Где в браузере безопаснее хранить refresh-токен?",
        "o": [
          "localStorage",
          "sessionStorage",
          "Cookie с флагами HttpOnly и Secure",
          "В URL"
        ],
        "a": 2,
        "why": "HttpOnly-cookie недоступна JavaScript, значит, XSS не сможет её украсть."
      },
      {
        "q": "Чем хэшировать пароли?",
        "o": [
          "SHA-256",
          "MD5 с солью",
          "argon2id или bcrypt",
          "Base64"
        ],
        "a": 2,
        "why": "Нужны медленные функции с солью и настраиваемой стоимостью."
      },
      {
        "q": "IDOR — это:",
        "o": [
          "Инъекция в SQL",
          "Доступ к чужому объекту подменой идентификатора",
          "Перехват cookie",
          "DDoS-атака"
        ],
        "a": 1,
        "why": "Лечится проверкой владельца в каждом запросе к ресурсу."
      },
      {
        "q": "Зачем нужен PKCE?",
        "o": [
          "Шифрует токен",
          "Защищает authorization code от перехвата в публичных клиентах (мобилки, SPA)",
          "Ускоряет вход",
          "Заменяет HTTPS"
        ],
        "a": 1,
        "why": "Мобильное приложение не может хранить client secret, PKCE решает эту проблему."
      }
    ],
    "videos": [
      {
        "t": "JWT: access и refresh токены",
        "u": "https://www.youtube.com/results?search_query=JWT%20access%20refresh%20%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D1%8B%20%D0%BA%D0%B0%D0%BA%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%8E%D1%82",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "OAuth 2.0 и OpenID Connect простыми словами",
        "u": "https://www.youtube.com/results?search_query=OAuth%202.0%20OpenID%20Connect%20PKCE%20%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D0%BC%D0%B8%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D0%BC%D0%B8",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "OWASP Top 10 для бэкенда",
        "u": "https://www.youtube.com/results?search_query=OWASP%20Top%2010%20explained%20backend",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "kafka",
    "line": "msg",
    "title": "Kafka и брокеры сообщений",
    "short": "Kafka",
    "weeks": 2.5,
    "goal": "Строить событийное взаимодействие сервисов: понимать партиции, группы потребителей, гарантии доставки и уметь не терять и не дублировать события.",
    "topics": [
      {
        "h": "Kafka",
        "items": [
          "Зачем брокер: развязка, буферизация, асинхронность",
          "Брокер, топик, партиция, offset, retention, log compaction",
          "Продюсер: ключ определяет партицию, acks=0/1/all (с Kafka 3.0 по умолчанию acks=all и идемпотентность включена), батчи",
          "Консьюмер: consumer group, ребалансировка (новый протокол KIP-848 в Kafka 4.0 убирает stop-the-world ребалансировки), ручной commit",
          "Порядок гарантирован только внутри партиции",
          "Репликация: лидер, ISR, min.insync.replicas. С Kafka 4.0 (март 2025) ZooKeeper удалён полностью, метаданные хранит KRaft",
          "Share groups (Queues for Kafka, KIP-932): очередная семантика поверх топиков — в 4.0 early access, в 4.1 preview. Следи за статусом перед использованием в проде"
        ]
      },
      {
        "h": "Гарантии и паттерны",
        "items": [
          "At-most-once, at-least-once, exactly-once — и почему на практике делают at-least-once плюс идемпотентный обработчик",
          "Outbox и CDC (Debezium), retry-топики, DLQ",
          "Схемы: JSON против Avro и Protobuf, Schema Registry, эволюция схем"
        ]
      },
      {
        "h": "Другие брокеры",
        "items": [
          "RabbitMQ: exchange (direct, topic, fanout), очереди, ack и nack, DLX",
          "Когда RabbitMQ, а когда Kafka. NATS и JetStream — обзор"
        ]
      },
      {
        "h": "Go",
        "items": [
          "franz-go, segmentio/kafka-go, confluent-kafka-go; amqp091-go для RabbitMQ"
        ]
      }
    ],
    "practice": [
      "Подними Kafka в режиме KRaft и Kafka UI через docker-compose.",
      "Продюсер и консьюмер на Go: ручной commit после обработки, дедупликация по event_id в Postgres.",
      "Запусти 3 консьюмера на топик с 6 партициями, останови одного и изучи ребалансировку в логах.",
      "DLQ: сообщение, которое упало 3 раза, уходит в отдельный топик с причиной в заголовках."
    ],
    "resources": [
      {
        "t": "Документация Apache Kafka",
        "u": "https://kafka.apache.org/documentation/"
      },
      {
        "t": "Бесплатные курсы Confluent",
        "u": "https://developer.confluent.io/courses/"
      },
      {
        "t": "Туториалы RabbitMQ",
        "u": "https://www.rabbitmq.com/tutorials"
      },
      {
        "t": "franz-go",
        "u": "https://github.com/twmb/franz-go"
      }
    ],
    "quiz": [
      {
        "q": "Где Kafka гарантирует порядок сообщений?",
        "o": [
          "Во всём кластере",
          "В топике",
          "Внутри партиции",
          "Нигде"
        ],
        "a": 2,
        "why": "Чтобы события одной сущности шли по порядку, у них должен быть одинаковый ключ."
      },
      {
        "q": "Топик с 4 партициями, в классической consumer group 6 консьюмеров. Сколько будут получать сообщения?",
        "o": [
          "6",
          "4",
          "1",
          "2"
        ],
        "a": 1,
        "why": "В обычной группе партицию читает максимум один консьюмер, двое простаивают. Share groups из Kafka 4.x снимают это ограничение, но они ещё не GA."
      },
      {
        "q": "Что значит acks=all?",
        "o": [
          "Подтверждение от лидера",
          "Подтверждение от всех in-sync реплик",
          "Без подтверждения",
          "Подтверждение от консьюмера"
        ],
        "a": 1,
        "why": "Вместе с min.insync.replicas=2 это защищает от потери при падении лидера."
      },
      {
        "q": "Что нужно обработчику при доставке at-least-once?",
        "o": [
          "Ничего",
          "Идемпотентность",
          "Синхронность",
          "Отдельная партиция"
        ],
        "a": 1,
        "why": "Сообщение может прийти повторно, например после ребалансировки до commit."
      },
      {
        "q": "Как отправить все события одного заказа в одну партицию?",
        "o": [
          "Указать номер партиции вручную",
          "Использовать order_id как ключ сообщения",
          "Сделать топик из одной партиции",
          "Это невозможно"
        ],
        "a": 1,
        "why": "Партиция выбирается по хэшу ключа."
      },
      {
        "q": "Что хранит log compaction?",
        "o": [
          "Только последние N минут",
          "Последнее значение для каждого ключа",
          "Только ошибки",
          "Сжатые батчи"
        ],
        "a": 1,
        "why": "Удобно для топиков-снимков состояния, например текущего профиля пользователя."
      },
      {
        "q": "Когда RabbitMQ уместнее Kafka?",
        "o": [
          "Нужно перечитывать историю событий",
          "Очереди задач со сложной маршрутизацией и подтверждением каждого сообщения",
          "Миллионы событий в секунду для аналитики",
          "Event sourcing"
        ],
        "a": 1,
        "why": "Kafka — распределённый лог, RabbitMQ — классический брокер очередей."
      }
    ],
    "videos": [
      {
        "t": "Николай Сивко — Apache Kafka как основа для велосипедостроения (HighLoad++)",
        "u": "https://www.youtube.com/results?search_query=Apache%20Kafka%20%D0%BA%D0%B0%D0%BA%20%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%B2%D0%B5%D0%BB%D0%BE%D1%81%D0%B8%D0%BF%D0%B5%D0%B4%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%A1%D0%B8%D0%B2%D0%BA%D0%BE",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "«Когда всё пошло по Кафке» (JPoint)",
        "u": "https://www.youtube.com/results?search_query=%D0%9A%D0%BE%D0%B3%D0%B4%D0%B0%20%D0%B2%D1%81%D1%91%20%D0%BF%D0%BE%D1%88%D0%BB%D0%BE%20%D0%BF%D0%BE%20%D0%9A%D0%B0%D1%84%D0%BA%D0%B5%20JPoint",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Kafka 4: KRaft, KIP-848, share groups",
        "u": "https://www.youtube.com/results?search_query=Apache%20Kafka%204.0%20KRaft%20share%20groups",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "grpc-realtime",
    "line": "web",
    "title": "gRPC, WebSocket и real-time",
    "short": "gRPC и WS",
    "weeks": 1.5,
    "goal": "Выбирать протокол под задачу: gRPC между сервисами, WebSocket и SSE для живых обновлений на клиенте.",
    "topics": [
      {
        "h": "gRPC",
        "items": [
          "Protocol Buffers: типы, номера полей, обратная совместимость, reserved",
          "Unary, server streaming, client streaming, bidirectional",
          "Метаданные, дедлайны, коды статусов, интерсепторы, health checking, reflection",
          "buf для линта и генерации, grpc-gateway для REST-фасада"
        ]
      },
      {
        "h": "Real-time",
        "items": [
          "WebSocket: апгрейд HTTP, ping и pong, переподключение, масштабирование через Redis Pub/Sub или NATS",
          "Server-Sent Events как простая альтернатива; long polling",
          "Связь с мобильным клиентом: web_socket_channel и grpc во Flutter"
        ]
      },
      {
        "h": "Ещё",
        "items": [
          "GraphQL — обзор: когда полезен, проблема N+1 и DataLoader",
          "Как выбрать протокол для внешнего API, межсервисного общения и real-time"
        ]
      }
    ],
    "practice": [
      "gRPC-сервис каталога: unary и server streaming, интерсептор логирования и дедлайнов, генерация через buf.",
      "Чат на WebSocket: два инстанса сервера за nginx, сообщения синхронизируются через Redis Pub/Sub.",
      "SSE-эндпоинт, который показывает прогресс долгой задачи."
    ],
    "resources": [
      {
        "t": "gRPC для Go",
        "u": "https://grpc.io/docs/languages/go/"
      },
      {
        "t": "Protocol Buffers",
        "u": "https://protobuf.dev/"
      },
      {
        "t": "Buf",
        "u": "https://buf.build/docs/"
      },
      {
        "t": "MDN: WebSockets API",
        "u": "https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API"
      }
    ],
    "quiz": [
      {
        "q": "Можно ли переиспользовать номер удалённого поля в protobuf?",
        "o": [
          "Да",
          "Нет, его помечают reserved",
          "Только в proto2",
          "Если сменить тип"
        ],
        "a": 1,
        "why": "Старые клиенты прочитают новые данные как старое поле."
      },
      {
        "q": "Какой тип RPC подходит для потока обновлений от сервера?",
        "o": [
          "Unary",
          "Server streaming",
          "Client streaming",
          "Никакой"
        ],
        "a": 1,
        "why": "Клиент отправляет один запрос и получает поток ответов."
      },
      {
        "q": "Чем SSE отличается от WebSocket?",
        "o": [
          "SSE двунаправленный",
          "SSE — поток только от сервера к клиенту поверх обычного HTTP",
          "SSE работает по UDP",
          "Ничем"
        ],
        "a": 1,
        "why": "Для уведомлений и прогресса SSE проще и дружит с прокси."
      },
      {
        "q": "Как разослать сообщение всем WebSocket-клиентам, подключённым к разным инстансам?",
        "o": [
          "Невозможно",
          "Через общий канал: Redis Pub/Sub, NATS или Kafka",
          "Через sticky sessions",
          "Через базу данных с опросом раз в минуту"
        ],
        "a": 1,
        "why": "Каждый инстанс подписан на канал и пересылает сообщение своим подключениям."
      }
    ],
    "videos": [
      {
        "t": "Николай Тузов — gRPC-сервис авторизации на Go",
        "u": "https://www.youtube.com/results?search_query=%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9%20%D0%A2%D1%83%D0%B7%D0%BE%D0%B2%20gRPC%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%20%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20Go",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Hussein Nasser — gRPC Crash Course",
        "u": "https://www.youtube.com/results?search_query=Hussein%20Nasser%20gRPC%20Crash%20Course",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Hussein Nasser — WebSockets и Server-Sent Events",
        "u": "https://www.youtube.com/results?search_query=Hussein%20Nasser%20WebSockets%20Crash%20Course%20Server-Sent%20Events",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "mongodb",
    "line": "data",
    "title": "MongoDB и другие хранилища",
    "short": "MongoDB и др.",
    "weeks": 1.5,
    "goal": "Понимать документные, колоночные и поисковые базы и осознанно выбирать хранилище под задачу.",
    "topics": [
      {
        "h": "MongoDB",
        "items": [
          "Документная модель, BSON, коллекции; встраивание против ссылок",
          "Индексы: одиночные, составные, multikey, текстовые, TTL",
          "Aggregation pipeline: $match, $group, $lookup, $unwind, $project",
          "Транзакции, replica set, шардирование и выбор shard key, read и write concern",
          "Mongo или Postgres с jsonb — честное сравнение"
        ]
      },
      {
        "h": "Другие хранилища",
        "items": [
          "ClickHouse: колоночное хранение, MergeTree, аналитика (OLAP)",
          "Elasticsearch и OpenSearch: инвертированный индекс, анализаторы, полнотекстовый поиск",
          "S3-совместимое хранилище (MinIO) для файлов, presigned URL",
          "CAP и PACELC на примерах этих систем"
        ]
      }
    ],
    "practice": [
      "Сервис отзывов на MongoDB: встраивание, агрегация среднего рейтинга, TTL-индекс для черновиков.",
      "Выгрузи события кликов в ClickHouse и посчитай DAU и воронку.",
      "Загрузка аватаров через presigned URL в MinIO."
    ],
    "resources": [
      {
        "t": "Документация MongoDB",
        "u": "https://www.mongodb.com/docs/"
      },
      {
        "t": "MongoDB University (бесплатно)",
        "u": "https://learn.mongodb.com/"
      },
      {
        "t": "Документация ClickHouse",
        "u": "https://clickhouse.com/docs"
      },
      {
        "t": "Документация MinIO",
        "u": "https://min.io/docs/minio/linux/index.html"
      }
    ],
    "quiz": [
      {
        "q": "Когда в MongoDB стоит встраивать вложенный документ?",
        "o": [
          "Всегда",
          "Данные читаются вместе и их рост ограничен",
          "Когда данных много и они растут без предела",
          "Никогда"
        ],
        "a": 1,
        "why": "Документ ограничен 16 МБ, а бесконечный массив внутри — антипаттерн."
      },
      {
        "q": "Какой этап агрегации соединяет коллекции?",
        "o": [
          "$group",
          "$lookup",
          "$match",
          "$unwind"
        ],
        "a": 1,
        "why": "$lookup — аналог LEFT JOIN."
      },
      {
        "q": "Почему монотонно растущий shard key (время) плохой?",
        "o": [
          "Он медленно сравнивается",
          "Все записи попадают в один шард",
          "Его нельзя индексировать",
          "Он занимает много места"
        ],
        "a": 1,
        "why": "Получается горячий шард. Используют хэшированный или составной ключ."
      },
      {
        "q": "Для чего хорош ClickHouse?",
        "o": [
          "Частые точечные UPDATE",
          "Аналитические агрегации по огромным объёмам",
          "Хранение сессий",
          "Очереди"
        ],
        "a": 1,
        "why": "Колоночное хранение читает только нужные колонки и отлично сжимается."
      }
    ],
    "videos": [
      {
        "t": "MongoDB: моделирование данных и агрегации",
        "u": "https://www.youtube.com/results?search_query=MongoDB%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20aggregation%20pipeline",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "ClickHouse: как устроен и зачем",
        "u": "https://www.youtube.com/results?search_query=ClickHouse%20%D0%BA%D0%B0%D0%BA%20%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%20%D0%B4%D0%BE%D0%BA%D0%BB%D0%B0%D0%B4%20MergeTree",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "k8s-cicd",
    "line": "infra",
    "title": "CI/CD и Kubernetes",
    "short": "CI/CD и K8s",
    "weeks": 2,
    "goal": "Автоматически проверять и выкатывать код, понимать базовые объекты Kubernetes и уметь развернуть в нём свой сервис.",
    "topics": [
      {
        "h": "CI/CD",
        "items": [
          "GitHub Actions: workflow, jobs, matrix, кэш модулей, секреты и окружения",
          "Пайплайн для Go: golangci-lint v2, тесты с -race и покрытием, govulncheck, сборка и публикация образа в GHCR",
          "Стратегии выката: rolling, blue-green, canary; откат",
          "Миграции базы при выкате: обратно совместимые изменения схемы (expand и contract)"
        ]
      },
      {
        "h": "Kubernetes",
        "items": [
          "Архитектура: control plane, kubelet, etcd; декларативный подход",
          "Pod, Deployment, ReplicaSet, Service (ClusterIP, NodePort, LoadBalancer), ConfigMap, Secret",
          "Requests и limits, liveness, readiness и startup пробы, HPA",
          "Входящий трафик: Gateway API (Gateway, HTTPRoute) как замена Ingress",
          "StatefulSet и почему базы в Kubernetes — отдельная непростая тема",
          "Helm и Kustomize; локально — kind, minikube или k3s"
        ]
      },
      {
        "h": "GitOps (обзор)",
        "items": [
          "Argo CD или Flux: кластер синхронизируется с состоянием в git"
        ]
      }
    ],
    "practice": [
      "Workflow GitHub Actions: lint, test, build и push образа в GHCR на каждый тег. Бейдж статуса в README.",
      "Разверни сервис и PostgreSQL в kind, сервис доступен через Gateway API.",
      "Сломай readiness-пробу и посмотри, как под выпадает из Service, не перезапускаясь.",
      "Выкати новую версию с ошибкой и откати через <code>kubectl rollout undo</code>.",
      "Упакуй сервис в Helm-чарт с values для dev и prod."
    ],
    "resources": [
      {
        "t": "Документация Kubernetes",
        "u": "https://kubernetes.io/ru/docs/home/"
      },
      {
        "t": "Gateway API",
        "u": "https://gateway-api.sigs.k8s.io/"
      },
      {
        "t": "GitHub Actions",
        "u": "https://docs.github.com/actions"
      },
      {
        "t": "golangci-lint",
        "u": "https://golangci-lint.run/"
      },
      {
        "t": "kind",
        "u": "https://kind.sigs.k8s.io/"
      }
    ],
    "quiz": [
      {
        "q": "Чем readiness-проба отличается от liveness?",
        "o": [
          "Ничем",
          "Readiness убирает под из балансировки, liveness перезапускает контейнер",
          "Liveness проверяет базу",
          "Readiness только при старте"
        ],
        "a": 1,
        "why": "Если упала зависимость, под надо вывести из трафика, а не перезапускать."
      },
      {
        "q": "Что произойдёт с подом, превысившим memory limit?",
        "o": [
          "Его притормозят",
          "Контейнер убьёт OOM killer",
          "Лимит расширится",
          "Ничего"
        ],
        "a": 1,
        "why": "CPU при превышении троттлится, а память — нет: процесс завершается."
      },
      {
        "q": "Что такое canary-выкат?",
        "o": [
          "Выкат сразу на все поды",
          "Новая версия сначала получает малую долю трафика",
          "Выкат ночью",
          "Откат по таймеру"
        ],
        "a": 1,
        "why": "Если метрики канарейки в порядке, долю трафика увеличивают."
      },
      {
        "q": "Как переименовать колонку без простоя при rolling-выкате?",
        "o": [
          "ALTER TABLE RENAME в той же версии",
          "Добавить новую колонку, писать в обе, перенести данные, затем удалить старую",
          "Остановить сервис",
          "Невозможно"
        ],
        "a": 1,
        "why": "Во время rolling-выката старая и новая версии работают одновременно, схема должна подходить обеим."
      },
      {
        "q": "Что пришло на смену Ingress API в Kubernetes?",
        "o": [
          "NodePort",
          "Gateway API",
          "Service Mesh",
          "kube-proxy"
        ],
        "a": 1,
        "why": "Ingress API заморожен, Gateway API — его официальный преемник."
      }
    ],
    "videos": [
      {
        "t": "Kubernetes для разработчиков",
        "u": "https://www.youtube.com/results?search_query=Kubernetes%20%D0%B4%D0%BB%D1%8F%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%BE%D0%B2%20%D1%81%20%D0%BD%D1%83%D0%BB%D1%8F",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "TechWorld with Nana — Kubernetes Tutorial",
        "u": "https://www.youtube.com/results?search_query=TechWorld%20with%20Nana%20Kubernetes%20Tutorial%20for%20Beginners",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Gateway API вместо Ingress",
        "u": "https://www.youtube.com/results?search_query=Kubernetes%20Gateway%20API%20tutorial%20ingress-nginx%20migration",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "observability",
    "line": "quality",
    "title": "Наблюдаемость: логи, метрики, трейсы",
    "short": "Наблюдаемость",
    "weeks": 1.5,
    "goal": "Видеть, что происходит с системой в продакшене, и находить причину проблемы за минуты, а не часы.",
    "topics": [
      {
        "h": "Логи",
        "items": [
          "Три сигнала наблюдаемости: логи, метрики, трейсы — и что видно в каждом",
          "Структурированные логи (log/slog, zap), уровни, request_id и trace_id в каждой записи",
          "Что нельзя логировать: персональные данные, токены, пароли",
          "Сбор: Loki или ELK"
        ]
      },
      {
        "h": "Метрики",
        "items": [
          "Модель Prometheus: pull, counter, gauge, histogram, summary",
          "Лейблы и кардинальность",
          "Методы RED и USE, PromQL (rate, histogram_quantile), дашборды Grafana, алерты"
        ]
      },
      {
        "h": "Трейсы и надёжность",
        "items": [
          "OpenTelemetry: span, распространение контекста через HTTP, gRPC и заголовки Kafka",
          "Jaeger или Tempo",
          "SLI, SLO, SLA, error budget",
          "Профилирование pprof; непрерывное профилирование (Pyroscope) — обзор"
        ]
      }
    ],
    "practice": [
      "Добавь /metrics с RED-метриками на все ручки и собери дашборд в Grafana.",
      "Сквозной трейс: HTTP, сервис A, Kafka, сервис B, Postgres — всё в одном трейсе в Jaeger.",
      "Алерт: p99 задержки больше 300 мс пять минут подряд."
    ],
    "resources": [
      {
        "t": "Prometheus",
        "u": "https://prometheus.io/docs/introduction/overview/"
      },
      {
        "t": "OpenTelemetry для Go",
        "u": "https://opentelemetry.io/docs/languages/go/"
      },
      {
        "t": "Книги Google SRE (бесплатно)",
        "u": "https://sre.google/books/"
      },
      {
        "t": "Grafana",
        "u": "https://grafana.com/docs/grafana/latest/"
      }
    ],
    "quiz": [
      {
        "q": "Какой тип метрики Prometheus нужен, чтобы считать перцентили задержки на стороне сервера?",
        "o": [
          "Counter",
          "Gauge",
          "Histogram",
          "Summary"
        ],
        "a": 2,
        "why": "Histogram агрегируется между инстансами через histogram_quantile. Summary — нет."
      },
      {
        "q": "Почему user_id нельзя делать лейблом метрики?",
        "o": [
          "Это незаконно",
          "Высокая кардинальность взрывает количество временных рядов",
          "Prometheus не поддерживает строки",
          "Это медленно на клиенте"
        ],
        "a": 1,
        "why": "Каждое уникальное значение лейбла — отдельный ряд в памяти."
      },
      {
        "q": "Что значит RED?",
        "o": [
          "Read, Execute, Delete",
          "Rate, Errors, Duration",
          "Requests, Events, Data",
          "Redis, Etcd, Docker"
        ],
        "a": 1,
        "why": "Три сигнала для любого сервиса, обрабатывающего запросы."
      },
      {
        "q": "Как трейс переходит из сервиса в сервис?",
        "o": [
          "Через общую базу",
          "Через заголовки, например W3C traceparent",
          "Через логи",
          "Автоматически через DNS"
        ],
        "a": 1,
        "why": "OpenTelemetry внедряет и извлекает контекст в каждом транспорте."
      }
    ],
    "videos": [
      {
        "t": "Prometheus и Grafana для Go-сервиса",
        "u": "https://www.youtube.com/results?search_query=Prometheus%20Grafana%20%D0%BC%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%BD%D0%B3%20Golang%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "OpenTelemetry tracing в Go",
        "u": "https://www.youtube.com/results?search_query=OpenTelemetry%20Go%20tracing%20tutorial",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "SLO, SLI и error budget",
        "u": "https://www.youtube.com/results?search_query=SLO%20SLI%20error%20budget%20%D0%BE%D0%B1%D1%8A%D1%8F%D1%81%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "go-internals",
    "line": "go",
    "title": "Go изнутри и производительность",
    "short": "Go изнутри",
    "weeks": 2,
    "goal": "Понимать планировщик, память и сборщик мусора и уметь ускорять сервис по данным профилировщика, а не наугад.",
    "topics": [
      {
        "h": "Рантайм",
        "items": [
          "Планировщик: модель G-M-P, work stealing, асинхронное вытеснение. С Go 1.25 GOMAXPROCS по умолчанию учитывает лимит CPU контейнера (cgroup) и обновляется на лету",
          "Стек и куча, escape analysis (<code>go build -gcflags=-m</code>), sync.Pool",
          "Сборщик мусора: concurrent mark-and-sweep, трёхцветная разметка, write barrier, GOGC и GOMEMLIMIT. С Go 1.26 по умолчанию Green Tea GC — сканирует память страницами, накладные расходы GC ниже на 10–40%"
        ]
      },
      {
        "h": "Устройство типов",
        "items": [
          "Слайс (указатель, длина, ёмкость), строка, map (Swiss Tables с Go 1.24), интерфейс и itab, канал (hchan)"
        ]
      },
      {
        "h": "Оптимизация",
        "items": [
          "pprof: CPU, heap, goroutine, block, mutex; go tool trace",
          "Нагрузочное тестирование: k6, vegeta",
          "PGO (profile-guided optimization)",
          "unsafe и reflect — что это и почему они редки"
        ]
      }
    ],
    "practice": [
      "Найди три места, где переменная уходит в кучу, убери это и докажи бенчмарком (allocs/op).",
      "Нагрузи свой сервис через k6, найди горячую функцию во flamegraph pprof и ускорь её минимум на 20%.",
      "Проверь поведение GOMEMLIMIT в контейнере с ограничением памяти."
    ],
    "resources": [
      {
        "t": "A Guide to the Go Garbage Collector",
        "u": "https://go.dev/doc/gc-guide"
      },
      {
        "t": "Profiling Go Programs",
        "u": "https://go.dev/blog/pprof"
      },
      {
        "t": "Profile-guided optimization",
        "u": "https://go.dev/doc/pgo"
      },
      {
        "t": "Ardan Labs Blog",
        "u": "https://www.ardanlabs.com/blog/"
      },
      {
        "t": "k6",
        "u": "https://grafana.com/docs/k6/latest/"
      },
      {
        "t": "Блог Go: Green Tea GC",
        "u": "https://go.dev/blog/greenteagc"
      }
    ],
    "quiz": [
      {
        "q": "Что такое P в модели G-M-P?",
        "o": [
          "Процесс ОС",
          "Логический процессор с локальной очередью горутин",
          "Пул памяти",
          "Пакет"
        ],
        "a": 1,
        "why": "M (поток ОС) должен захватить P, чтобы выполнять горутины G."
      },
      {
        "q": "Как узнать, что переменная ушла в кучу?",
        "o": [
          "go vet",
          "go build -gcflags=-m",
          "go test -race",
          "go mod why"
        ],
        "a": 1,
        "why": "Компилятор напечатает escapes to heap и moved to heap."
      },
      {
        "q": "GOGC=100 означает, что GC запустится, когда:",
        "o": [
          "Пройдёт 100 мс",
          "Куча вырастет на 100% от живого объёма после прошлой сборки",
          "Будет 100 МБ памяти",
          "Будет 100 горутин"
        ],
        "a": 1,
        "why": "GOGC=200 — реже и больше памяти, GOGC=50 — чаще и меньше памяти."
      },
      {
        "q": "Зачем GOMEMLIMIT?",
        "o": [
          "Жёстко убивает процесс при превышении",
          "Мягкий лимит: рядом с ним GC работает активнее, что спасает от OOM в контейнере",
          "Ограничивает число горутин",
          "Ограничивает стек"
        ],
        "a": 1,
        "why": "До Go 1.19 приходилось держать балласт в памяти."
      },
      {
        "q": "Go-сервис в контейнере с лимитом 2 CPU на 32-ядерном хосте. Какой GOMAXPROCS будет в Go 1.25+ без ручной настройки?",
        "o": [
          "32",
          "2",
          "1",
          "Зависит от GOGC"
        ],
        "a": 1,
        "why": "С Go 1.25 рантайм читает лимит CPU из cgroup. Раньше ставили библиотеку uber-go/automaxprocs."
      }
    ],
    "videos": [
      {
        "t": "Kavya Joshi — Understanding Channels (GopherCon 2017)",
        "u": "https://www.youtube.com/results?search_query=GopherCon%202017%20Understanding%20Channels%20Kavya%20Joshi",
        "lang": "en",
        "kind": "search"
      },
      {
        "t": "Kavya Joshi — go test -race Under the Hood",
        "u": "https://www.youtube.com/watch?v=5erqWdlhQLA",
        "lang": "en",
        "kind": "video"
      },
      {
        "t": "Планировщик Go: модель GMP",
        "u": "https://www.youtube.com/results?search_query=%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D1%89%D0%B8%D0%BA%20Go%20GMP%20%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Сборщик мусора Go и Green Tea",
        "u": "https://www.youtube.com/results?search_query=Go%20garbage%20collector%20Green%20Tea",
        "lang": "en",
        "kind": "search"
      }
    ]
  },
  {
    "id": "system-design",
    "line": "arch",
    "title": "System Design",
    "short": "System Design",
    "weeks": 3,
    "goal": "Проектировать системы под нагрузку и уверенно проходить секцию system design на собеседовании.",
    "topics": [
      {
        "h": "Подход",
        "items": [
          "Требования функциональные и нефункциональные, оценка нагрузки на салфетке (RPS, объём, трафик)",
          "API, модель данных, высокоуровневая схема, узкие места, компромиссы"
        ]
      },
      {
        "h": "Строительные блоки",
        "items": [
          "Вертикальное и горизонтальное масштабирование, stateless-сервисы",
          "Балансировщики L4 и L7 и их алгоритмы, CDN",
          "Репликация (leader-follower, multi-leader, leaderless), шардирование (range, hash, consistent hashing)",
          "Консистентность: CAP, PACELC, eventual consistency, read-your-writes, кворумы",
          "Кэши на всех уровнях, очереди и back-pressure",
          "Идентификаторы: UUIDv7, Snowflake"
        ]
      },
      {
        "h": "Классические задачи",
        "items": [
          "Сокращатель ссылок, rate limiter, лента новостей, мессенджер",
          "Такси и геопоиск: geohash, H3, PostGIS",
          "Уведомления, загрузка файлов, платёжная система и идемпотентность"
        ]
      }
    ],
    "practice": [
      "Письменно разбери шесть классических задач с диаграммами в Excalidraw.",
      "Оцени нагрузку для своих лабораторных: сколько RPS выдержит текущая схема и что сломается первым.",
      "Проведи два mock-собеседования по system design с другом или в сообществе."
    ],
    "resources": [
      {
        "t": "System Design Primer",
        "u": "https://github.com/donnemartin/system-design-primer"
      },
      {
        "t": "ByteByteGo",
        "u": "https://bytebytego.com/"
      },
      {
        "t": "Книга: Designing Data-Intensive Applications",
        "u": "https://dataintensive.net/"
      },
      {
        "t": "Martin Kleppmann: заметки к курсу Distributed Systems",
        "u": "https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/dist-sys-notes.pdf"
      }
    ],
    "quiz": [
      {
        "q": "Какую проблему решает consistent hashing?",
        "o": [
          "Шифрование ключей",
          "Минимальное перераспределение ключей при добавлении или удалении узла",
          "Сжатие данных",
          "Порядок сообщений"
        ],
        "a": 1,
        "why": "При обычном hash mod N смена N перемешивает почти все ключи."
      },
      {
        "q": "Когда возникает проблема read-your-writes?",
        "o": [
          "При записи в лидер и мгновенном чтении с отстающей реплики",
          "При шардировании",
          "При кэшировании в CDN",
          "При использовании UUID"
        ],
        "a": 0,
        "why": "Решения: читать свои данные с лидера какое-то время, или отслеживать позицию репликации."
      },
      {
        "q": "1 млн DAU, каждый делает 10 запросов в день. Средний RPS примерно:",
        "o": [
          "10",
          "115",
          "1 000",
          "10 000"
        ],
        "a": 1,
        "why": "10 млн / 86 400 ≈ 115. Пиковая нагрузка обычно в 2–5 раз выше."
      },
      {
        "q": "Почему UUIDv7 лучше UUIDv4 для первичного ключа?",
        "o": [
          "Короче",
          "Упорядочен по времени, меньше фрагментации B-tree",
          "Безопаснее",
          "Генерируется базой"
        ],
        "a": 1,
        "why": "Случайные v4 вставляются в произвольные места индекса. В PostgreSQL 18 есть встроенная uuidv7()."
      }
    ],
    "videos": [
      {
        "t": "Martin Kleppmann — Distributed Systems (Кембридж, 23 лекции)",
        "u": "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB",
        "lang": "en",
        "kind": "playlist"
      },
      {
        "t": "MIT 6.824 — Distributed Systems",
        "u": "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB",
        "lang": "en",
        "kind": "playlist"
      },
      {
        "t": "System design интервью на русском: разборы",
        "u": "https://www.youtube.com/results?search_query=system%20design%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D1%8C%D1%8E%20%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80%20%D0%BD%D0%B0%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%BC",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "Доклады HighLoad++ про архитектуру",
        "u": "https://www.youtube.com/results?search_query=HighLoad%2B%2B%20%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B4%D0%BE%D0%BA%D0%BB%D0%B0%D0%B4",
        "lang": "ru",
        "kind": "search"
      }
    ]
  },
  {
    "id": "interview",
    "line": "arch",
    "title": "Подготовка к собеседованиям",
    "short": "Собеседования",
    "weeks": 3,
    "goal": "Пройти алгоритмы, live-coding на Go и вопросы по всему стеку, собрать портфолио из лабораторных.",
    "topics": [
      {
        "h": "Алгоритмы",
        "items": [
          "Массивы и строки, хэш-таблицы, два указателя, скользящее окно",
          "Стек, очередь, бинарный поиск, деревья, графы (BFS, DFS), куча, базовое DP",
          "Оценка сложности по времени и памяти"
        ]
      },
      {
        "h": "Live-coding на Go",
        "items": [
          "Worker pool, LRU-кэш, rate limiter, слияние каналов, параллельный обход с ограничением",
          "Вопросы на понимание: слайсы, map, интерфейсы, каналы, планировщик, GC, context"
        ]
      },
      {
        "h": "Портфолио и soft skills",
        "items": [
          "README лабораторных с архитектурной схемой, бейджи CI, инструкция запуска",
          "Истории по STAR; коммерческий опыт во Flutter — сильная сторона: ты понимаешь, что нужно клиенту от API",
          "Резюме под бэкенд-роль, английская версия для международных вакансий"
        ]
      }
    ],
    "practice": [
      "100 задач LeetCode уровня Easy и Medium по паттернам, решения на Go.",
      "LRU-кэш и rate limiter за 30 минут каждый, с тестами.",
      "Подготовь пять STAR-историй."
    ],
    "resources": [
      {
        "t": "NeetCode Roadmap",
        "u": "https://neetcode.io/roadmap"
      },
      {
        "t": "LeetCode",
        "u": "https://leetcode.com/"
      },
      {
        "t": "100 Go Mistakes",
        "u": "https://100go.co/"
      }
    ],
    "quiz": [
      {
        "q": "Средняя сложность поиска по ключу в map Go:",
        "o": [
          "O(log n)",
          "O(1)",
          "O(n)",
          "O(n log n)"
        ],
        "a": 1,
        "why": "Хэш-таблица; в худшем случае деградирует, но в среднем константа."
      },
      {
        "q": "Какие структуры дают LRU-кэш с операциями O(1)?",
        "o": [
          "Массив и сортировка",
          "Хэш-таблица и двусвязный список",
          "Куча",
          "Двоичное дерево поиска"
        ],
        "a": 1,
        "why": "Map находит узел, список позволяет перенести его в начало и выкинуть хвост."
      },
      {
        "q": "Что делает <code>for i := range 3</code> в Go 1.22+?",
        "o": [
          "Ошибка компиляции",
          "Итерации 0, 1, 2",
          "Итерации 1, 2, 3",
          "Бесконечный цикл"
        ],
        "a": 1,
        "why": "С Go 1.22 можно делать range по целому числу."
      }
    ],
    "videos": [
      {
        "t": "Mock-собеседования Go-разработчика",
        "u": "https://www.youtube.com/results?search_query=%D1%81%D0%BE%D0%B1%D0%B5%D1%81%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20Go%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%20mock%20live%20coding",
        "lang": "ru",
        "kind": "search"
      },
      {
        "t": "NeetCode — задачи по паттернам",
        "u": "https://www.youtube.com/results?search_query=NeetCode%20roadmap",
        "lang": "en",
        "kind": "search"
      }
    ]
  }
];
