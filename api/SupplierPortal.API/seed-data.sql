-- Script per inserimento dati di test nel database SupplierPortal
-- Eseguire dopo aver applicato le migrazioni EF Core

USE SupplierPortalDb;

-- Inserimento Users di test
INSERT INTO [Users] ([Id], [ExternalId], [Email], [FirstName], [LastName], [Role], [IsActive], [Created], [CreatedBy]) VALUES
(NEWID(), 'ext_001', 'mario.rossi@supplier1.com', 'Mario', 'Rossi', 'SupplierUser', 1, GETDATE(), 'system'),
(NEWID(), 'ext_002', 'anna.verdi@supplier2.com', 'Anna', 'Verdi', 'SupplierUser', 1, GETDATE(), 'system'),
(NEWID(), 'ext_003', 'luca.bianchi@remira.com', 'Luca', 'Bianchi', 'Agent', 1, GETDATE(), 'system'),
(NEWID(), 'ext_004', 'sara.neri@remira.com', 'Sara', 'Neri', 'Agent', 1, GETDATE(), 'system');

-- Inserimento Suppliers di test
INSERT INTO [Suppliers] ([Id], [Name], [Code], [Email], [IsActive], [Created], [CreatedBy]) VALUES
(NEWID(), 'Acme Corporation', 'ACME001', 'contact@acme.com', 1, GETDATE(), 'system'),
(NEWID(), 'TechSolutions Ltd', 'TECH002', 'info@techsolutions.com', 1, GETDATE(), 'system'),
(NEWID(), 'Global Manufacturing', 'GLOB003', 'orders@globalmanuf.com', 1, GETDATE(), 'system');

-- Variabili per gli ID (per referenze)
DECLARE @User1 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Users] WHERE Email = 'mario.rossi@supplier1.com');
DECLARE @User2 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Users] WHERE Email = 'anna.verdi@supplier2.com');
DECLARE @Agent1 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Users] WHERE Email = 'luca.bianchi@remira.com');
DECLARE @Agent2 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Users] WHERE Email = 'sara.neri@remira.com');

DECLARE @Supplier1 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Suppliers] WHERE Code = 'ACME001');
DECLARE @Supplier2 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Suppliers] WHERE Code = 'TECH002');
DECLARE @Supplier3 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Suppliers] WHERE Code = 'GLOB003');

-- Inserimento UserSuppliers (assegnazioni user-supplier)
INSERT INTO [UserSuppliers] ([Id], [UserId], [SupplierId], [Created], [CreatedBy]) VALUES
(NEWID(), @User1, @Supplier1, GETDATE(), 'system'),
(NEWID(), @User2, @Supplier2, GETDATE(), 'system');

-- Inserimento AgentAssignments
INSERT INTO [AgentAssignments] ([Id], [AgentId], [UserId], [Created], [CreatedBy]) VALUES
(NEWID(), @Agent1, @User1, GETDATE(), 'system'),
(NEWID(), @Agent2, @User2, GETDATE(), 'system');

-- Inserimento Questionnaires con scadenze diverse
INSERT INTO [Questionnaires] ([Id], [Title], [Description], [Type], [DueDate], [Status], [SupplierId], [AssignedUserId], [AssignedAgentId], [Created], [CreatedBy]) VALUES
-- Questionari in scadenza nei prossimi giorni (urgenti)
(NEWID(), 'Annual Compliance Review 2025', 'Comprehensive compliance questionnaire for annual review', 'Compliance', DATEADD(DAY, 2, GETDATE()), 'Pending', @Supplier1, @User1, @Agent1, GETDATE(), 'system'),
(NEWID(), 'Quality Assurance Assessment', 'Quality management system evaluation', 'Quality', DATEADD(DAY, 5, GETDATE()), 'InProgress', @Supplier2, @User2, @Agent2, GETDATE(), 'system'),

-- Questionari in scadenza entro una settimana
(NEWID(), 'Environmental Impact Survey', 'Assessment of environmental practices and sustainability', 'Environmental', DATEADD(DAY, 7, GETDATE()), 'Pending', @Supplier1, @User1, @Agent1, GETDATE(), 'system'),
(NEWID(), 'Financial Health Check', 'Financial stability and performance evaluation', 'Financial', DATEADD(DAY, 10, GETDATE()), 'Pending', @Supplier3, NULL, @Agent1, GETDATE(), 'system'),

-- Questionari in scadenza entro due settimane
(NEWID(), 'IT Security Audit', 'Cybersecurity measures and data protection compliance', 'Security', DATEADD(DAY, 14, GETDATE()), 'Pending', @Supplier2, @User2, @Agent2, GETDATE(), 'system'),
(NEWID(), 'Supply Chain Risk Assessment', 'Evaluation of supply chain resilience and risk factors', 'RiskManagement', DATEADD(DAY, 18, GETDATE()), 'Pending', @Supplier1, @User1, @Agent1, GETDATE(), 'system'),

-- Questionari già scaduti (per testing di casi edge)
(NEWID(), 'Overdue Ethics Review', 'Code of conduct and ethics compliance check', 'Ethics', DATEADD(DAY, -3, GETDATE()), 'Overdue', @Supplier3, NULL, @Agent2, DATEADD(DAY, -30, GETDATE()), 'system'),

-- Questionari già completati (non dovrebbero apparire nella dashboard)
(NEWID(), 'Completed Training Assessment', 'Employee training and development evaluation', 'Training', DATEADD(DAY, -10, GETDATE()), 'Completed', @Supplier1, @User1, @Agent1, DATEADD(DAY, -40, GETDATE()), 'system');

-- Inserimento Remediations per alcuni questionari
DECLARE @Quest1 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Questionnaires] WHERE Title = 'Annual Compliance Review 2025');
DECLARE @Quest2 UNIQUEIDENTIFIER = (SELECT TOP 1 Id FROM [Questionnaires] WHERE Title = 'Overdue Ethics Review');

INSERT INTO [Remediations] ([Id], [Description], [Notes], [DueDate], [Status], [QuestionnaireId], [ResponsibleUserId], [ResponsibleAgentId], [Created], [CreatedBy]) VALUES
(NEWID(), 'Update compliance documentation', 'Missing certificates need to be uploaded', DATEADD(DAY, 5, GETDATE()), 'Open', @Quest1, @User1, @Agent1, GETDATE(), 'system'),
(NEWID(), 'Complete ethics training module', 'All staff must complete the new ethics training by end of month', DATEADD(DAY, 7, GETDATE()), 'InProgress', @Quest2, NULL, @Agent2, GETDATE(), 'system');

PRINT 'Dati di test inseriti con successo!';
PRINT 'Users inseriti: 4';
PRINT 'Suppliers inseriti: 3'; 
PRINT 'Questionnaires inseriti: 8';
PRINT 'Remediations inserite: 2';
