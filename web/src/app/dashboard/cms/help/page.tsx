'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const Help: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-full w-full bg-gray-100 p-4 sm:p-6 md:p-8  overflow-hidden">
        <div className="flex items-center h-full justify-start flex-col pt-0">
          <div className="my-10 text-3xl text-black/80">Help request Center</div>
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center">
            <Button className="rounded-full py-2 px-4 text-sm md:text-base bg-green-900/80">
              Help request with liveChat.com
            </Button>
            <span> </span>
            <Button className="rounded-full py-2 px-4 text-sm md:text-base bg-green-900/80">
              Help request with Gmail.com
            </Button>
          </div>

          <div className="mt-6 w-full text-center text-xs md:text-sm lg:text-base text-green-900/90">
            Some questions to Jounalfy
          </div>

          <div className="mt-6 w-full px-4 md:px-20 lg:px-80 overflow-auto max-h-[400vh]">
            {' '}
            {/* max-height dan overflow-auto */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm md:text-base">
                  <div>Terms of Service </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm lg:text-base max-h-60 overflow-y-auto">
                  <ReactMarkdown className={' overflow-auto'}>
                    {`
## 1. **Introduction**
This blog is managed by our team and is intended for readers from various backgrounds and professions. By accessing our website, you agree to comply with the terms of service and abide by the policies and regulations applicable in your local and national jurisdiction.

## 2. **Permitted Use**
- Users must use this site in a manner that complies with applicable laws, both locally and internationally.
- Users are expected to respect others by commenting in a polite and friendly manner. All comments and interactions should adhere to our community guidelines.

## 3. **Intellectual Property Rights**
All content on this blog, including articles, images, and designs, is protected by copyright. Unauthorized use of content without our written permission is prohibited.

## 4. **Site Security**
This blog is protected by SSL (Secure Sockets Layer) to ensure the security of your information while visiting our site. We continuously monitor and improve site security to protect user data.

## 5. **Service Changes**
Our team reserves the right to update or modify this site and its services at any time to keep pace with technological advancements and policy changes.

## 6. **Compliance with Policies and Laws**
Users accessing the site from various countries are expected to comply with local laws. We are also committed to adhering to regulations and policies that apply in each country where this site can be accessed.
                `}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm md:text-base">
                  <div>Privacy Policy </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm lg:text-base max-h-60 overflow-y-auto">
                  <ReactMarkdown>
                    {`
## 1. **Information Collection**
We collect personal information from users, such as names, email addresses, and other non-personal data when you subscribe, comment, or interact with our blog.

## 2. **Use of Information**
The information collected will be used to enhance the user experience, respond to inquiries, manage subscriptions, and update content according to readers' preferences. User personal data will not be sold or shared with third parties without consent.

## 3. **Information Security**
We use SSL encryption technology to protect user data transmitted over the network. Additionally, further security measures are implemented to ensure that your data is securely stored.

## 4. **Cookies**
This site uses cookies to track user preferences and provide a better experience while interacting with our content. You can set your browser to refuse cookies; however, some features may not function optimally.

## 5. **User Rights**
Users have the right to access, update, or delete their personal information stored by us. If you wish to modify or delete your data, please contact us.

## 6. **Age Policy**
This site is intended for users of all ages; however, users under the age of 18 must obtain permission from a parent or guardian before providing any personal information.

## 7. **Policy Changes**
We may update this privacy policy from time to time to reflect changes in our services, technology, or laws. Users are encouraged to check this page periodically for the latest updates.

### **Conclusion**
We greatly appreciate active participation from our readers and are open to constructive suggestions and comments. Please feel free to ask questions and engage in discussions, as we are committed to maintaining polite and friendly interactions on this site. Any feedback that aligns with our policies will be highly valued.
                  `}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm md:text-base">
                  <div>Frequently Asked Questions </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm lg:text-base max-h-60 overflow-y-auto">
                  <ReactMarkdown>
                    {`
### **1. What is Jounalfy?**
Jounalfy is a platform designed to provide readers with various articles and content based on their interests.

### **2. How can I contact support?**
You can contact support through our live chat feature or via email, as indicated above.

### **3. Can I contribute to the blog?**
Yes! We welcome guest contributions. Please reach out to us via email for guidelines.
                  `}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div> { ' ' }
    </div>
  );
};

export default Help;
