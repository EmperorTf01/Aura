 import { useState, useEffect } from 'react';
 import jsPDF from 'jspdf';
 import autoTable from 'jspdf-autotable';
 import { BlueprintSidebar } from './BlueprintSidebar';
 import { BlueprintHeader } from './BlueprintHeader';
 import { ReasoningPanel } from './ReasoningPanel';
 import { OverviewSection } from './sections/OverviewSection';
 import { UsersSection } from './sections/UsersSection';
 import { TechStackSection } from './sections/TechStackSection';
 import { ArchitectureSection } from './sections/ArchitectureSection';
 import { WorkflowSection } from './sections/WorkflowSection';
 import { RisksSection } from './sections/RisksSection';
 import { ResourcesSection } from './sections/ResourcesSection';
 import { SectionSkeleton } from './sections/SectionSkeleton';
 import type { Blueprint } from '@/types/project';
 import { toast } from '@/hooks/use-toast';
 
 function downloadBlueprintPDF(blueprint: Blueprint) {
   const filename = `${blueprint.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-blueprint`;
   const doc = new jsPDF();
   const pageWidth = doc.internal.pageSize.getWidth();
   const margin = 20;
   let yPos = 20;
 
   const addNewPageIfNeeded = (requiredSpace: number = 30) => {
     if (yPos + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
       doc.addPage();
       yPos = 20;
     }
   };
 
   const addSectionTitle = (title: string) => {
     addNewPageIfNeeded(25);
     doc.setFillColor(59, 130, 246);
     doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
     doc.setTextColor(255, 255, 255);
     doc.setFontSize(14);
     doc.setFont('helvetica', 'bold');
     doc.text(title, margin + 5, yPos + 7);
     doc.setTextColor(0, 0, 0);
     yPos += 18;
   };
 
   const addSubSection = (title: string) => {
     addNewPageIfNeeded(20);
     doc.setFontSize(11);
     doc.setFont('helvetica', 'bold');
     doc.setTextColor(59, 130, 246);
     doc.text(title, margin, yPos);
     doc.setTextColor(0, 0, 0);
     yPos += 7;
   };
 
   const addText = (text: string, indent: number = 0) => {
     doc.setFontSize(10);
     doc.setFont('helvetica', 'normal');
     const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
     lines.forEach((line: string) => {
       addNewPageIfNeeded(8);
       doc.text(line, margin + indent, yPos);
       yPos += 5;
     });
     yPos += 2;
   };
 
   const addBulletList = (items: string[], indent: number = 5) => {
     doc.setFontSize(10);
     doc.setFont('helvetica', 'normal');
     items.forEach(item => {
       addNewPageIfNeeded(8);
       doc.text('•', margin + indent, yPos);
       const lines = doc.splitTextToSize(item, pageWidth - margin * 2 - indent - 8);
       lines.forEach((line: string, idx: number) => {
         if (idx > 0) addNewPageIfNeeded(6);
         doc.text(line, margin + indent + 6, yPos);
         if (idx < lines.length - 1) yPos += 5;
       });
       yPos += 6;
     });
   };
 
   // Header
   doc.setFillColor(15, 23, 42);
   doc.rect(0, 0, pageWidth, 45, 'F');
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(24);
   doc.setFont('helvetica', 'bold');
   doc.text(blueprint.title, margin, 25);
   doc.setFontSize(12);
   doc.setFont('helvetica', 'normal');
   const typeLabel = blueprint.projectType.charAt(0).toUpperCase() + blueprint.projectType.slice(1);
   doc.text(`Project Type: ${typeLabel}`, margin, 38);
   doc.setTextColor(0, 0, 0);
   yPos = 55;
 
   // Overview Section
   addSectionTitle('Overview');
   addSubSection('Problem');
   addText(blueprint.overview.problem);
   addSubSection('Solution');
   addText(blueprint.overview.solution);
   addSubSection('Key Features');
   addBulletList(blueprint.overview.features);
   if (blueprint.overview.assumptions?.length > 0) {
     addSubSection('Assumptions');
     addBulletList(blueprint.overview.assumptions);
   }
 
   // Target Users Section
   addSectionTitle('Target Users');
   if (blueprint.targetUsers.primary?.length > 0) {
     addSubSection('Primary Users');
     addBulletList(blueprint.targetUsers.primary);
   }
   if (blueprint.targetUsers.secondary?.length > 0) {
     addSubSection('Secondary Users');
     addBulletList(blueprint.targetUsers.secondary);
   }
   if (blueprint.targetUsers.personas?.length > 0) {
     addSubSection('User Personas');
     addBulletList(blueprint.targetUsers.personas);
   }
 
   // Tech Stack Section
   addSectionTitle('Technology Stack');
   addNewPageIfNeeded(40);
   autoTable(doc, {
     startY: yPos,
     head: [['Technology', 'Category', 'Reason']],
     body: blueprint.techStack.map(t => [t.name, t.category, t.reason]),
     margin: { left: margin, right: margin },
     headStyles: { fillColor: [59, 130, 246], textColor: 255 },
     styles: { fontSize: 9, cellPadding: 4 },
     columnStyles: {
       0: { fontStyle: 'bold', cellWidth: 35 },
       1: { cellWidth: 30 },
       2: { cellWidth: 'auto' }
     }
   });
   yPos = (doc as any).lastAutoTable.finalY + 15;
 
   // Architecture Section
   addSectionTitle('Architecture');
   addSubSection('Components');
   addBulletList(blueprint.architecture.components);
   addSubSection('Relationships');
   addBulletList(blueprint.architecture.relationships);
 
   // Development Phases Section
   addSectionTitle('Development Phases');
   addNewPageIfNeeded(40);
   autoTable(doc, {
     startY: yPos,
     head: [['Phase', 'Duration', 'Tasks']],
     body: blueprint.phases.map(p => [p.name, p.duration, p.tasks.join('\n• ')]),
     margin: { left: margin, right: margin },
     headStyles: { fillColor: [59, 130, 246], textColor: 255 },
     styles: { fontSize: 9, cellPadding: 4 },
     columnStyles: {
       0: { fontStyle: 'bold', cellWidth: 40 },
       1: { cellWidth: 25 },
       2: { cellWidth: 'auto' }
     }
   });
   yPos = (doc as any).lastAutoTable.finalY + 15;
 
   // Risks Section
   addSectionTitle('Risks & Mitigations');
   addNewPageIfNeeded(40);
   const severityColors: Record<string, [number, number, number]> = {
     high: [239, 68, 68],
     medium: [245, 158, 11],
     low: [34, 197, 94]
   };
   autoTable(doc, {
     startY: yPos,
     head: [['Risk Type', 'Severity', 'Description', 'Mitigation']],
     body: blueprint.risks.map(r => [r.type, r.severity.toUpperCase(), r.description, r.mitigation]),
     margin: { left: margin, right: margin },
     headStyles: { fillColor: [59, 130, 246], textColor: 255 },
     styles: { fontSize: 8, cellPadding: 3 },
     columnStyles: {
       0: { fontStyle: 'bold', cellWidth: 25 },
       1: { cellWidth: 18 },
       2: { cellWidth: 50 },
       3: { cellWidth: 'auto' }
     },
     didParseCell: (data) => {
       if (data.section === 'body' && data.column.index === 1) {
         const severity = data.cell.raw?.toString().toLowerCase() || '';
         if (severityColors[severity]) {
           data.cell.styles.textColor = severityColors[severity];
           data.cell.styles.fontStyle = 'bold';
         }
       }
     }
   });
   yPos = (doc as any).lastAutoTable.finalY + 15;
 
   // Resources Section
   if (blueprint.resources?.length > 0) {
     addSectionTitle('Resources');
     addNewPageIfNeeded(40);
     autoTable(doc, {
       startY: yPos,
       head: [['Title', 'Type', 'URL']],
       body: blueprint.resources.map(r => [r.title, r.type, r.url]),
       margin: { left: margin, right: margin },
       headStyles: { fillColor: [59, 130, 246], textColor: 255 },
       styles: { fontSize: 9, cellPadding: 4 },
       columnStyles: {
         0: { fontStyle: 'bold', cellWidth: 50 },
         1: { cellWidth: 30 },
         2: { cellWidth: 'auto', textColor: [59, 130, 246] }
       }
     });
   }
 
   // Footer on each page
   const pageCount = doc.getNumberOfPages();
   for (let i = 1; i <= pageCount; i++) {
     doc.setPage(i);
     doc.setFontSize(8);
     doc.setTextColor(150);
     doc.text(
       `Generated by Blueprint • Page ${i} of ${pageCount}`,
       pageWidth / 2,
       doc.internal.pageSize.getHeight() - 10,
       { align: 'center' }
     );
   }
 
   doc.save(`${filename}.pdf`);
 }
 
 interface BlueprintDashboardProps {
   blueprint: Blueprint;
   onBack: () => void;
 }
 
 type SectionKey = 'overview' | 'users' | 'techstack' | 'architecture' | 'workflow' | 'risks' | 'resources';
 
 export function BlueprintDashboard({ blueprint, onBack }: BlueprintDashboardProps) {
   const [activeSection, setActiveSection] = useState<SectionKey>('workflow');
   const [completedSections, setCompletedSections] = useState<string[]>(['workflow']);
   const [loadedSections, setLoadedSections] = useState<Set<SectionKey>>(new Set());
 
   useEffect(() => {
     const loadSection = (section: SectionKey, delay: number) => {
       setTimeout(() => {
         setLoadedSections(prev => new Set([...prev, section]));
       }, delay);
     };
 
     loadSection('workflow', 300);
     loadSection('overview', 500);
     loadSection('users', 700);
     loadSection('techstack', 900);
     loadSection('architecture', 1100);
     loadSection('risks', 1300);
     loadSection('resources', 1500);
   }, []);
 
   const handleSectionChange = (section: string) => {
     setActiveSection(section as SectionKey);
     if (!completedSections.includes(section)) {
       setCompletedSections([...completedSections, section]);
     }
   };
 
   const handleSave = () => {
     toast({
       title: "Blueprint saved",
       description: "Your project blueprint has been saved successfully.",
     });
   };
 
   const handleExport = () => {
     try {
       downloadBlueprintPDF(blueprint);
       toast({
         title: "PDF exported",
         description: "Your blueprint has been downloaded as a PDF.",
       });
     } catch (error) {
       console.error('Export error:', error);
       toast({
         title: "Export failed",
         description: "There was an error exporting your blueprint.",
         variant: "destructive",
       });
     }
   };
 
   const handleShare = () => {
     toast({
       title: "Share link copied",
       description: "The share link has been copied to your clipboard.",
     });
   };
 
   const isLoaded = loadedSections.has(activeSection);
 
   const renderSection = () => {
     if (!isLoaded) {
       return <SectionSkeleton variant={activeSection} />;
     }
 
     switch (activeSection) {
       case 'overview':
         return <OverviewSection overview={blueprint.overview} />;
       case 'users':
         return <UsersSection targetUsers={blueprint.targetUsers} />;
       case 'techstack':
         return <TechStackSection techStack={blueprint.techStack} />;
       case 'architecture':
         return <ArchitectureSection architecture={blueprint.architecture} />;
       case 'workflow':
         return <WorkflowSection workflow={blueprint.workflow} />;
       case 'risks':
         return <RisksSection risks={blueprint.risks} />;
       case 'resources':
         return <ResourcesSection resources={blueprint.resources} />;
       default:
         return <OverviewSection overview={blueprint.overview} />;
     }
   };
 
   return (
     <div className="h-screen flex flex-col bg-background">
       <BlueprintHeader
         title={blueprint.title}
         projectType={blueprint.projectType}
         onBack={onBack}
         onSave={handleSave}
         onExport={handleExport}
         onShare={handleShare}
       />
 
       <div className="flex-1 flex overflow-hidden">
         <BlueprintSidebar
           activeSection={activeSection}
           onSectionChange={handleSectionChange}
           completedSections={completedSections}
         />
 
         <main className="flex-1 overflow-y-auto p-8">
           <div className="max-w-4xl mx-auto">
             {renderSection()}
           </div>
         </main>
 
         <ReasoningPanel activeSection={activeSection} />
       </div>
     </div>
   );
 }