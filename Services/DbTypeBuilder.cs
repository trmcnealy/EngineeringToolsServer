using System;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;
using System.Text.Json.Serialization;

using PostgreSql;

namespace EngineeringToolsServer.Services
{
    public class DbTypeBuilder
    {
        public string AssemblyName { get; }

        public string ModuleName { get; }

        public string TypeName { get; }

        public List<string> PropertyNames = new List<string>();

        private readonly AssemblyBuilder _assemblyBuilder;
        private readonly ModuleBuilder   _moduleBuilder;
        private readonly TypeBuilder     _typeBuilder;

        private readonly Type            JsonPropertyNameAttributeType = typeof(JsonPropertyNameAttribute);
        private readonly ConstructorInfo JsonPropertyNameAttributeInfo;

        public DbTypeBuilder(string assemblyName,
                             string moduleName,
                             string typeName)
        {
            AssemblyName = assemblyName;
            ModuleName   = moduleName;
            TypeName     = typeName;

            _assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly(new AssemblyName(AssemblyName), AssemblyBuilderAccess.RunAndCollect);

            _moduleBuilder = _assemblyBuilder.DefineDynamicModule(ModuleName);
            _typeBuilder   = _moduleBuilder.DefineType(TypeName, TypeAttributes.Public);

            JsonPropertyNameAttributeInfo = JsonPropertyNameAttributeType.GetConstructor(new Type[]
            {
                typeof(string)
            });
        }

        public void AddProperty(string name,
                                Type   type)
        {

            FieldBuilder customerNameBldr = _typeBuilder.DefineField($"_{name}",
                                                                     type,
                                                                     FieldAttributes.Private);


            PropertyBuilder propertyBuilder = _typeBuilder.DefineProperty(name, PropertyAttributes.HasDefault, type, null);


            MethodAttributes getSetAttr = MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig;

            MethodBuilder custNameGetPropMthdBldr = _typeBuilder.DefineMethod($"get_{name}",
                                                                              getSetAttr,
                                                                              type,
                                                                              Type.EmptyTypes);

            ILGenerator custNameGetIL = custNameGetPropMthdBldr.GetILGenerator();

            custNameGetIL.Emit(OpCodes.Ldarg_0);
            custNameGetIL.Emit(OpCodes.Ldfld, customerNameBldr);
            custNameGetIL.Emit(OpCodes.Ret);

            MethodBuilder custNameSetPropMthdBldr = _typeBuilder.DefineMethod($"set_{name}",
                                                                              getSetAttr,
                                                                              null,
                                                                              new Type[] { type });

            ILGenerator custNameSetIL = custNameSetPropMthdBldr.GetILGenerator();

            custNameSetIL.Emit(OpCodes.Ldarg_0);
            custNameSetIL.Emit(OpCodes.Ldarg_1);
            custNameSetIL.Emit(OpCodes.Stfld, customerNameBldr);
            custNameSetIL.Emit(OpCodes.Ret);

            propertyBuilder.SetGetMethod(custNameGetPropMthdBldr);
            propertyBuilder.SetSetMethod(custNameSetPropMthdBldr);


            CustomAttributeBuilder customAttributeBuilder = new CustomAttributeBuilder(JsonPropertyNameAttributeInfo,
                                                                                       new object[]
                                                                                       {
                                                                                           name
                                                                                       });

            propertyBuilder.SetCustomAttribute(customAttributeBuilder);

            PropertyNames.Add(name);
        }

        public Type CreateType()
        {
            return _typeBuilder.CreateType();
        }

        public static void SetProperty<T>(Type   newType,
                                          object obj,
                                          string name,
                                          T      value)
        {
            newType.GetProperty(name)?.SetValue(obj, value);
        }

        public object CreateNew(Type newType)
        {
            return Activator.CreateInstance(newType);
        }

        public static Type GetClrType(OidKind type)
        {
            switch(type)
            {
                case OidKind.BOOLOID:
                {
                    return typeof(bool?);
                }
                case OidKind.CHAROID:
                {
                    return typeof(char?);
                }
                case OidKind.BYTEAOID:
                {
                    return typeof(sbyte?);
                }
                case OidKind.INT2OID:
                {
                    return typeof(short?);
                }
                case OidKind.INT4OID:
                {
                    return typeof(int?);
                }
                case OidKind.INT8OID:
                {
                    return typeof(long?);
                }
                case OidKind.FLOAT4OID:
                {
                    return typeof(float?);
                }
                case OidKind.FLOAT8OID:
                {
                    return typeof(double?);
                }
                case OidKind.VARCHAROID:
                case OidKind.TEXTOID:
                {
                    return typeof(string);
                }
                case OidKind.TIMEOID:
                case OidKind.TIMESTAMPOID:
                case OidKind.DATEOID:
                {
                    return typeof(DateTime?);
                }
                case OidKind.POINTOID:
                case OidKind.POLYGONOID:
                default:
                {
                    throw new NotSupportedException(type.ToString());
                }
            }
        }
    }
}