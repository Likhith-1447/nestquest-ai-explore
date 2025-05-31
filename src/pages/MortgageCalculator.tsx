
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, Percent, Calendar, ArrowLeft, Sparkles, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(6000);
  const [insurance, setInsurance] = useState(1200);
  const [hoa, setHoa] = useState(0);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    const monthlyPrincipalInterest = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTaxInsurance = (propertyTax + insurance) / 12;
    const monthlyHoa = hoa;
    
    const totalMonthly = monthlyPrincipalInterest + monthlyTaxInsurance + monthlyHoa;
    const totalInterestPaid = (monthlyPrincipalInterest * numPayments) - principal;
    const totalPaid = totalMonthly * numPayments;

    setMonthlyPayment(totalMonthly);
    setTotalInterest(totalInterestPaid);
    setTotalPayment(totalPaid);
  };

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);

  const breakdownData = [
    { name: 'Principal & Interest', value: Math.round(monthlyPayment - (propertyTax + insurance) / 12 - hoa), color: '#8B5CF6' },
    { name: 'Property Tax', value: Math.round(propertyTax / 12), color: '#06B6D4' },
    { name: 'Insurance', value: Math.round(insurance / 12), color: '#10B981' },
    { name: 'HOA Fees', value: Math.round(hoa), color: '#F59E0B' }
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/search" className="text-gray-700 hover:text-purple-600 transition-colors">Search</Link>
              <Link to="/market-trends" className="text-gray-700 hover:text-purple-600 transition-colors">Market Trends</Link>
              <Link to="/neighborhoods" className="text-gray-700 hover:text-purple-600 transition-colors">Neighborhoods</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator</h2>
          <p className="text-gray-600">Calculate your monthly payments and explore different scenarios</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Inputs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="homePrice">Home Price</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="homePrice"
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <span className="text-sm text-gray-600">{downPaymentPercent}%</span>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      max={homePrice * 0.5}
                      min={homePrice * 0.03}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertyTax">Annual Property Tax</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="propertyTax"
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="insurance">Annual Insurance</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="insurance"
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hoa">Monthly HOA Fees</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="hoa"
                      type="number"
                      value={hoa}
                      onChange={(e) => setHoa(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Payment Summary */}
            <Card className="border-purple-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Monthly Payment</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-gray-600">Total monthly housing cost</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-700">
                      ${(homePrice - downPayment).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Loan Amount</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-700">
                      ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-600">Total Interest</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-lg font-semibold text-green-700">
                      ${totalPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-600">Total Paid</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Monthly Payment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsPieChart>
                        <Pie
                          data={breakdownData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value}`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {breakdownData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded mr-3" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="font-medium">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-purple-800">AI Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {downPayment < homePrice * 0.2 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-amber-800 text-sm">
                        <strong>Consider increasing your down payment:</strong> With less than 20% down, you'll likely need PMI insurance, adding to your monthly costs.
                      </p>
                    </div>
                  )}
                  {monthlyPayment > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 text-sm">
                        <strong>Rule of thumb:</strong> Your total monthly payment should be no more than 28% of your gross monthly income for optimal financial health.
                      </p>
                    </div>
                  )}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm">
                      <strong>Tip:</strong> Making an extra monthly payment towards principal can save you thousands in interest over the life of the loan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 gradient-ai text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Get Pre-approved
              </Button>
              <Button variant="outline" className="flex-1">
                Find Properties in Budget
              </Button>
              <Button variant="outline" className="flex-1">
                Contact Lender
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
