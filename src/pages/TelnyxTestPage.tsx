import TelnyxTest from '../components/common/TelnyxTest';

const TelnyxTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Telnyx WebRTC Connection Test</h1>
        <TelnyxTest />
      </div>
    </div>
  );
};

export default TelnyxTestPage;
