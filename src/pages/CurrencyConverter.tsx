
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, TrendingUp, Globe, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample currency data
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

// Mock exchange rates relative to USD
const exchangeRates = {
  USD: 1.00,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 150.72,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.21,
  INR: 83.08,
  SGD: 1.34,
};

// Popular currency pairs
const popularPairs = [
  { from: "USD", to: "EUR" },
  { from: "EUR", to: "USD" },
  { from: "USD", to: "GBP" },
  { from: "USD", to: "JPY" },
  { from: "EUR", to: "GBP" },
  { from: "GBP", to: "USD" },
];

type ExchangeRates = Record<string, number>;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | string>("");
  const [rates, setRates] = useState<ExchangeRates>(exchangeRates);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      setConvertedAmount("");
      return;
    }

    // Get exchange rates for the currencies
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    
    if (fromRate && toRate) {
      // Convert to USD first, then to target currency
      const amountInUSD = Number(amount) / fromRate;
      const result = amountInUSD * toRate;
      
      // Format the result
      setConvertedAmount(result.toFixed(2));
    } else {
      toast({
        variant: "destructive",
        title: "Conversion Error",
        description: "Could not find exchange rates for the selected currencies.",
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleConvert = () => {
    convertCurrency();
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const refreshRates = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, we'd fetch fresh rates from an API
      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Rates Updated",
        description: "Currency exchange rates have been updated.",
      });
      
      convertCurrency();
    }, 1500);
  };

  return (
    <div className="container max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>
      
      <Tabs defaultValue="converter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="converter">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Converter
          </TabsTrigger>
          <TabsTrigger value="rates">
            <TrendingUp className="mr-2 h-4 w-4" /> Exchange Rates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="converter">
          <Card className="shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Convert Currencies
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Get real-time exchange rates for your travel budget planning
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-2/3 space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        className="flex-1"
                      />
                      <Button onClick={handleConvert}>Convert</Button>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center self-end mb-1">
                    <Button variant="outline" size="icon" onClick={swapCurrencies}>
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="icon" onClick={swapCurrencies} className="md:hidden">
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From Currency</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To Currency</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Card className="bg-secondary/70">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Converted Amount</p>
                      <p className="text-2xl font-bold">
                        {convertedAmount
                          ? `${currencies.find((c) => c.code === toCurrency)?.symbol || ""} ${convertedAmount}`
                          : "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Exchange Rate</p>
                      <p>
                        1 {fromCurrency} ={" "}
                        {((rates[toCurrency] / rates[fromCurrency]) || 0).toFixed(4)} {toCurrency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
                <Button variant="ghost" size="sm" onClick={refreshRates} disabled={isLoading}>
                  <RefreshCw className={`mr-1 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh Rates
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Popular Currency Pairs</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {popularPairs.map((pair, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        setFromCurrency(pair.from);
                        setToCurrency(pair.to);
                      }}
                    >
                      {pair.from} → {pair.to}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rates">
          <Card className="shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Exchange Rates
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Current exchange rates against major currencies
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Currency</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-3 md:col-span-2">Code</div>
                    <div className="col-span-6 md:col-span-4">Currency</div>
                    <div className="col-span-3 md:col-span-3 text-right">Rate</div>
                    <div className="hidden md:block md:col-span-3">1 {fromCurrency} =</div>
                  </div>
                  
                  <div className="divide-y">
                    {currencies
                      .filter((currency) => currency.code !== fromCurrency)
                      .map((currency) => {
                        const rate = rates[currency.code] / rates[fromCurrency];
                        return (
                          <div key={currency.code} className="grid grid-cols-12 p-3 hover:bg-secondary/30">
                            <div className="col-span-3 md:col-span-2 font-medium">
                              {currency.code}
                            </div>
                            <div className="col-span-6 md:col-span-4 text-muted-foreground">
                              {currency.name}
                            </div>
                            <div className="col-span-3 md:col-span-3 text-right">
                              {rate.toFixed(4)}
                            </div>
                            <div className="hidden md:block md:col-span-3 text-muted-foreground">
                              {currency.symbol} {rate.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Note: Exchange rates are for informational purposes only and may vary from actual market rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CurrencyConverter;
