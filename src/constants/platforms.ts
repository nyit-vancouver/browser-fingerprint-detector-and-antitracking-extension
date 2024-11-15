export const PLATFORMS: Record<string, Record<string, any>[]> = {
  windows: [
    {
      id: 'win1',
      name: 'Win 7',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.1; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win2',
      name: 'Win 8',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.2; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win3',
      name: 'Win 8.1',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 6.3; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -40,
      browsers: ['edg', 'esr2', 'gcr', 'ie']
    },
    {
      id: 'win4',
      name: 'Win 10',
      nav: {
        version: '5.0 (Windows)',
        oscpu: 'Windows NT 10.0; Win64; x64',
        platform: 'Win32'
      },
      screenOffset: -30,
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'ie']
    }
  ],
  macos: [
    //  Use last 3 versions of macOS
    {
      id: 'mac1',
      name: 'macOS 12',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    },
    {
      id: 'mac2',
      name: 'macOS 13',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    },
    {
      id: 'mac3',
      name: 'macOS 14',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr', 'sf'],
      nav: {
        version: '',
        oscpu: 'Intel Mac OS X 10.15',
        platform: 'MacIntel'
      },
      screenOffset: -23,
      uaPlatform: 'Macintosh; Intel Mac OS X 10_15_7'
    }
  ],
  linux: [
    {
      id: 'lin1',
      name: 'Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -45, // kde + maia panel
      uaPlatform: 'X11; Linux x86_64'
    },
    {
      id: 'lin2',
      name: 'Fedora Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -27, // gnome
      uaPlatform: 'X11; Fedora; Linux x86_64'
    },
    {
      id: 'lin3',
      name: 'Ubuntu Linux',
      browsers: ['edg', 'esr', 'esr2', 'ff', 'gcr'],
      nav: {
        version: '5.0 (X11)',
        oscpu: 'Linux x86_64',
        platform: 'Linux x86_64'
      },
      screenOffset: -27, // gnome
      uaPlatform: 'X11; Linux x86_64'
    }
  ],
  ios: [
    {
      id: 'ios1',
      name: 'iOS 16',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '16_7_2'
    },
    {
      id: 'ios2',
      name: 'iOS 17',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '17_7'
    },
    {
      id: 'ios3',
      name: 'iOS 18',
      browsers: ['gcrm', 'gcrt', 'sfm', 'sft'],
      uaPlatform: '18_1'
    }
  ],
  android: [
    {
      id: 'and1',
      name: 'Android 11',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 11'
    },
    {
      id: 'and2',
      name: 'Android 12',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 12'
    },
    {
      id: 'and3',
      name: 'Android 13',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 13'
    },
    {
      id: 'and4',
      name: 'Android 14',
      browsers: ['edgm', 'ffm', 'fft', 'gcrm', 'gcrt'],
      uaPlatform: 'Android 14'
    }
  ]
}
