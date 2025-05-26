import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_crashlytics_test/firebase_options.dart';
import 'package:simple_logger/simple_logger.dart';
import 'package:stack_trace/stack_trace.dart';

final logger =
    SimpleLogger()
      ..onLogged = (log, info) {
        if (info.level >= Level.SEVERE) {
          FirebaseCrashlytics.instance.recordFlutterError(
            FlutterErrorDetails(
              exception: info.message,
              library: 'logger',
              context: DiagnosticsNode.message(log),
              stack: Trace.current(),
            ),
          );
        }
      };

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  FlutterError.onError = (errorDetails) {
    FirebaseCrashlytics.instance.recordFlutterError(errorDetails);
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack);
    return true;
  };
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(theme: ThemeData.light(), home: const HomePage());
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Column(
          children: [
            OutlinedButton(
              onPressed: () {
                FirebaseCrashlytics.instance.crash();
              },
              child: const Text('Force crash - Fatal error'),
            ),
            OutlinedButton(
              onPressed: () {
                logger.severe('This is Non-Fatal error2');
              },
              child: const Text('logger - Non-Fatal error'),
            ),
            OutlinedButton(
              onPressed: () {
                throw UnsupportedError('This is Non-Fatal error');
              },
              child: const Text('UnsupportedError - Non-Fatal error'),
            ),
            ElevatedButton(
              onPressed: () {
                logger.severe('ElevatedButton Error');
              },
              child: const Text('logger - Non-Fatal error'),
            ),
            ElevatedButton(
              onPressed: () {
                throw UnimplementedError();
              },
              child: const Text('ElevatedButton logger - Non-Fatal error'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute<void>(builder: (context) => const _Page2()),
                );
              },
              child: const Text('Navigate page'),
            ),
          ],
        ),
      ),
    );
  }
}

class _Page2 extends StatelessWidget {
  const _Page2();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('')),
      body: Center(
        child: Column(
          children: [
            OutlinedButton(
              onPressed: () {
                throw UnsupportedError('This is Non-Fatal error');
              },
              child: const Text('UnsupportedError - Non-Fatal error'),
            ),
            ElevatedButton(
              onPressed: () {
                logger.severe('ElevatedButton Error');
              },
              child: const Text('logger - Non-Fatal error'),
            ),
          ],
        ),
      ),
    );
  }
}
